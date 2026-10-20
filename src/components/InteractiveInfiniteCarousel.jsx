import React, { useRef, useEffect, useState } from 'react';

/**
 * InteractiveInfiniteCarousel:
 * - Autoplays infinitely in a seamless bidirectional loop
 * - Fully interactive with Click & Drag (mouse & touch) and trackpad horizontal gestures
 * - Buffer tracks on BOTH left and right eliminate all snapping/jumping artifacts
 * - Smooth physics inertia glide when released
 * - Pauses on hover; cleanly preserves card clicks when not dragging
 */
export default function InteractiveInfiniteCarousel({
  items,
  renderItem,
  gapClass = "gap-[0.8333vw]",
  paddingRightClass = "pr-[0.8333vw]",
  className = "",
  speed = -0.75, // pixels per frame at 60fps
}) {
  const outerRef = useRef(null);
  const trackContainerRef = useRef(null);
  const track1Ref = useRef(null);

  const offsetRef = useRef(0);
  const singleTrackWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const lastXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const rafIdRef = useRef(null);
  const isInitializedRef = useRef(false);

  const [isCursorGrabbing, setIsCursorGrabbing] = useState(false);

  // Measure single track width dynamically via ResizeObserver
  useEffect(() => {
    const track = track1Ref.current;
    if (!track) return;

    const updateWidth = () => {
      const rect = track.getBoundingClientRect();
      if (rect.width > 0) {
        const prevWidth = singleTrackWidthRef.current;
        singleTrackWidthRef.current = rect.width;

        // On first initialization, center offset at -width so left buffer track exists
        if (!isInitializedRef.current) {
          offsetRef.current = -rect.width;
          isInitializedRef.current = true;
          if (trackContainerRef.current) {
            trackContainerRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
          }
        } else if (prevWidth > 0 && prevWidth !== rect.width) {
          // Scale current offset proportionally if screen resized
          offsetRef.current = (offsetRef.current / prevWidth) * rect.width;
        }
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(track);

    window.addEventListener('resize', updateWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  // Main animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 16.667, 2); // Normalized frame delta
      lastTime = time;

      if (!isDraggingRef.current) {
        // Inertia decay if velocity exists from drag release
        if (Math.abs(velocityRef.current) > 0.05) {
          offsetRef.current += velocityRef.current * dt;
          velocityRef.current *= Math.pow(0.95, dt); // Silky friction glide
        } else if (!isHoveredRef.current) {
          // Normal continuous auto-scroll speed
          offsetRef.current += speed * dt;
        }

        // Seamless bidirectional infinite wrap within [-2w, -w]
        const w = singleTrackWidthRef.current;
        if (w > 0) {
          while (offsetRef.current <= -2 * w) {
            offsetRef.current += w;
          }
          while (offsetRef.current > -w) {
            offsetRef.current -= w;
          }
        }

        if (trackContainerRef.current) {
          trackContainerRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [speed]);

  // Pointer drag handlers (attached to window on pointerdown for uninterrupted dragging)
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    lastXRef.current = e.clientX;
    lastMoveTimeRef.current = performance.now();
    velocityRef.current = 0;
    setIsCursorGrabbing(true);

    const onPointerMove = (moveEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = moveEvent.clientX - dragStartXRef.current;
      if (Math.abs(deltaX) > 4) {
        hasDraggedRef.current = true;
      }

      const now = performance.now();
      const dt = Math.max(1, now - lastMoveTimeRef.current);
      const instantVelocity = ((moveEvent.clientX - lastXRef.current) / dt) * 16.667;
      // Smooth rolling velocity
      velocityRef.current = velocityRef.current * 0.35 + instantVelocity * 0.65;
      lastXRef.current = moveEvent.clientX;
      lastMoveTimeRef.current = now;

      offsetRef.current = dragStartOffsetRef.current + deltaX;

      // Real-time wrap in [-2w, -w] during drag with zero visual jump
      const w = singleTrackWidthRef.current;
      if (w > 0) {
        while (offsetRef.current <= -2 * w) {
          offsetRef.current += w;
          dragStartOffsetRef.current += w;
        }
        while (offsetRef.current > -w) {
          offsetRef.current -= w;
          dragStartOffsetRef.current -= w;
        }
      }

      if (trackContainerRef.current) {
        trackContainerRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      setIsCursorGrabbing(false);

      // If user held pointer stationary before releasing (>60ms), cancel fling velocity
      if (performance.now() - lastMoveTimeRef.current > 60) {
        velocityRef.current = 0;
      }

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
  };

  // Support horizontal trackpad swipe / tilt wheel
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
      e.preventDefault();
      offsetRef.current -= e.deltaX * 0.8;

      const w = singleTrackWidthRef.current;
      if (w > 0) {
        while (offsetRef.current <= -2 * w) offsetRef.current += w;
        while (offsetRef.current > -w) offsetRef.current -= w;
      }

      if (trackContainerRef.current) {
        trackContainerRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
    }
  };

  return (
    <div
      ref={outerRef}
      onPointerDown={handlePointerDown}
      onWheel={handleWheel}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      className={`w-full overflow-hidden select-none touch-pan-y ${
        isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
    >
      <div
        ref={trackContainerRef}
        className="flex flex-nowrap w-max will-change-transform"
      >
        {/* Track 0: Buffer Left (Guarantees seamless cards when dragging right) */}
        <div
          className={`flex shrink-0 ${gapClass} ${paddingRightClass}`}
          aria-hidden="true"
        >
          {items.map((item, idx) => (
            <React.Fragment key={`t0-${idx}`}>
              {renderItem(item, idx, hasDraggedRef)}
            </React.Fragment>
          ))}
        </div>

        {/* Track 1: Primary Center Track (Measured for width) */}
        <div
          ref={track1Ref}
          className={`flex shrink-0 ${gapClass} ${paddingRightClass}`}
        >
          {items.map((item, idx) => (
            <React.Fragment key={`t1-${idx}`}>
              {renderItem(item, idx, hasDraggedRef)}
            </React.Fragment>
          ))}
        </div>

        {/* Track 2: Buffer Right 1 */}
        <div
          className={`flex shrink-0 ${gapClass} ${paddingRightClass}`}
          aria-hidden="true"
        >
          {items.map((item, idx) => (
            <React.Fragment key={`t2-${idx}`}>
              {renderItem(item, idx, hasDraggedRef)}
            </React.Fragment>
          ))}
        </div>

        {/* Track 3: Buffer Right 2 (Wide screen buffer) */}
        <div
          className={`flex shrink-0 ${gapClass} ${paddingRightClass}`}
          aria-hidden="true"
        >
          {items.map((item, idx) => (
            <React.Fragment key={`t3-${idx}`}>
              {renderItem(item, idx, hasDraggedRef)}
            </React.Fragment>
          ))}
        </div>

        {/* Track 4: Buffer Right 3 (Ultra-wide / rapid drag buffer) */}
        <div
          className={`flex shrink-0 ${gapClass} ${paddingRightClass}`}
          aria-hidden="true"
        >
          {items.map((item, idx) => (
            <React.Fragment key={`t4-${idx}`}>
              {renderItem(item, idx, hasDraggedRef)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}