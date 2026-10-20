import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MuteButton({ isMuted, onToggle }) {
  const [lensDataUrl, setLensDataUrl] = useState('');
  const feImageRef = useRef(null);

  useEffect(() => {
    // Generate optical spherical barrel lens normal map for real-time circular glass refraction
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(size, size);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Normalized coordinates from -1 to 1 centered at (0, 0)
        const nx = (x / (size - 1)) * 2 - 1;
        const ny = (y / (size - 1)) * 2 - 1;
        const r = Math.sqrt(nx * nx + ny * ny);

        let dx = 0;
        let dy = 0;

        if (r <= 1.0) {
          // Optical dome lens refraction force (barrel magnification with curved rim distortion)
          const force = Math.sin(r * Math.PI) * (1.0 - r * 0.2);
          dx = - (r > 0 ? (nx / r) : 0) * force;
          dy = - (r > 0 ? (ny / r) : 0) * force;
        }

        const idx = (y * size + x) * 4;
        // R channel: horizontal refraction (-1..1 -> 0..255)
        imgData.data[idx] = Math.round((dx * 0.5 + 0.5) * 255);
        // G channel: vertical refraction (-1..1 -> 0..255)
        imgData.data[idx + 1] = Math.round((dy * 0.5 + 0.5) * 255);
        // B channel: neutral 255
        imgData.data[idx + 2] = 255;
        // Alpha: 255
        imgData.data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const dataUrl = canvas.toDataURL();
    setLensDataUrl(dataUrl);

    if (feImageRef.current) {
      feImageRef.current.setAttribute('href', dataUrl);
      feImageRef.current.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', dataUrl);
    }
  }, []);

  return (
    <>
      {/* Invisible SVG filter providing optical Liquid Glass refraction displacement */}
      <svg
        className="fixed pointer-events-none -z-50 w-0 h-0 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <filter id="norque-liquid-lens-circle" x="-20%" y="-20%" width="140%" height="140%">
            <feImage
              ref={feImageRef}
              id="norque-lens-map"
              href={lensDataUrl || undefined}
              xlinkHref={lensDataUrl || undefined}
              result="normalMap"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="normalMap"
              scale="26"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Circular Dark Satin Liquid Glass Mute Button */}
      <button
        onClick={onToggle}
        type="button"
        aria-label={isMuted ? "Unmute background audio" : "Mute background audio"}
        className="fixed bottom-6 right-6 sm:bottom-[1.6667vw] sm:right-[1.6667vw] z-50 group w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center cursor-pointer select-none border border-white/15 hover:border-white/30 text-white active:scale-[0.92] transition-transform duration-200"
        style={{
          boxShadow: 'none',
          background: 'linear-gradient(135deg, rgba(32, 32, 38, 0.65) 0%, rgba(14, 14, 18, 0.75) 100%)',
          backdropFilter: lensDataUrl
            ? 'url(#norque-liquid-lens-circle) blur(4px) brightness(1.06)'
            : 'blur(12px) brightness(1.06)',
          WebkitBackdropFilter: lensDataUrl
            ? 'url(#norque-liquid-lens-circle) blur(4px) brightness(1.06)'
            : 'blur(12px) brightness(1.06)',
        }}
      >
        <span className="flex items-center justify-center text-white/90 group-hover:text-white transition-colors pointer-events-none">
          {isMuted ? (
            <VolumeX className="w-[18px] h-[18px] text-white/60 group-hover:text-white transition-colors" strokeWidth={2} />
          ) : (
            <Volume2 className="w-[18px] h-[18px] text-white" strokeWidth={2} />
          )}
        </span>
      </button>
    </>
  );
}
