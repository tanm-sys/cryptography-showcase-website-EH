import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousTextRef = useRef(text);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const previousText = previousTextRef.current;
    const newText = text;
    const chars = Array.from(container.children) as HTMLElement[];

    if (newText.length !== previousText.length) {
      previousTextRef.current = newText;
      // The component will re-render with the new text length,
      // so we just return to avoid animation errors on a mismatched set of elements.
      return;
    }

    const tl = gsap.timeline();

    chars.forEach((char, i) => {
      if (newText[i] !== previousText[i] && newText[i] !== ' ') {
        tl.to(char, {
          duration: 0.2,
          opacity: 0,
          y: 10,
          rotationX: 90,
          transformOrigin: 'bottom center',
          ease: 'power2.in',
        }, i * 0.02);

        tl.set(char, {
          textContent: newText[i],
          y: -10,
          rotationX: -90,
          opacity: 0,
        });

        tl.to(char, {
          duration: 0.4,
          opacity: 1,
          y: 0,
          rotationX: 0,
          ease: 'back.out(1.4)',
        });
      } else if (newText[i] !== previousText[i] && newText[i] === ' ') {
        // Handle spaces differently if needed, e.g., a simple fade
        gsap.set(char, { textContent: ' ' });
      }
    });

    previousTextRef.current = newText;
  }, [text]);

  const spans = text.split('').map((char, index) => (
    <span
      key={`${char}-${index}`}
      className="inline-block"
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {char}
    </span>
  ));

  return (
    <div ref={containerRef} className={cn("flex flex-wrap", className)} style={{ perspective: '400px' }}>
      {spans}
    </div>
  );
};

export default AnimatedText;
