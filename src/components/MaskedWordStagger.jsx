import React from 'react';
import { motion } from 'framer-motion';

/* ========================================================================= */
/* UNIVERSAL MASKED WORD STAGGER COMPONENT                                   */
/* Splits text into words masked inside overflow-hidden wrappers.            */
/* Triggers word-by-word stagger upon entering viewport with universal curve */
/* ========================================================================= */
const defaultContainerVariants = {
  hidden: {},
  visible: (custom = {}) => ({
    transition: {
      staggerChildren: custom.stagger ?? 0.018,
      delayChildren: custom.delay ?? 0,
    },
  }),
};

const defaultWordVariants = {
  hidden: {
    y: '115%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0, 0.8, 0.2, 1],
    },
  },
};

export default function MaskedWordStagger({
  children,
  className = '',
  delay = 0,
  stagger = 0.018,
  amount = 0.15,
  as: Component = 'p',
}) {
  const elements = React.Children.toArray(children);

  return (
    <Component className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
        variants={defaultContainerVariants}
        custom={{ delay, stagger }}
      >
        {elements.map((child, elemIdx) => {
          if (typeof child === 'string') {
            const words = child.split(/\s+/).filter(Boolean);
            return words.map((word, wordIdx) => {
              const startsWithPunctuation = /^[,\.;:!?]/.test(word);
              const shouldPullLeft = elemIdx > 0 && wordIdx === 0 && startsWithPunctuation;

              return (
                <span
                  key={`${elemIdx}-${wordIdx}`}
                  className={`inline-block overflow-hidden align-top ${
                    shouldPullLeft ? 'ml-[-0.28em]' : ''
                  } mr-[0.28em] pb-[0.06em]`}
                >
                  <motion.span
                    className="inline-block"
                    variants={defaultWordVariants}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            });
          }

          if (React.isValidElement(child) && child.type === 'br') {
            return <br key={elemIdx} className="block" />;
          }

          // Embedded interactive link or custom element
          return (
            <span
              key={elemIdx}
              className="inline-block overflow-hidden align-top mr-[0.28em] pb-[0.06em]"
            >
              <motion.span
                className="inline-block"
                variants={defaultWordVariants}
              >
                {child}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Component>
  );
}
