import React, { useMemo, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { hexToBinary } from '@/lib/crypto';

const HashVisualization = ({ hash }: { hash: string }) => {
  const binaryHash = useMemo(() => hexToBinary(hash), [hash]);
  const prevBinaryHashRef = useRef(''.padStart(256, '0'));
  const bitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || bitRefs.current.length < 256) {
      return;
    }

    const computedStyle = getComputedStyle(containerRef.current);
    const primaryColorValue = computedStyle.getPropertyValue('--primary').trim();
    const mutedColorValue = computedStyle.getPropertyValue('--muted').trim();

    if (!primaryColorValue || !mutedColorValue) {
      console.warn("HashVisualization: Could not compute CSS variables for animation.");
      return;
    }

    const primaryColor = `hsl(${primaryColorValue})`;
    const mutedColor = `hsl(${mutedColorValue})`;

    const prevBinary = prevBinaryHashRef.current;
    const newBinary = binaryHash;

    if (newBinary.length !== 256) return;

    // Initial animation
    if (prevBinary === ''.padStart(256, '0')) {
      gsap.set(bitRefs.current, { backgroundColor: mutedColor });
      const tl = gsap.timeline();
      tl.fromTo(bitRefs.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: {
            each: 0.004,
            from: "center",
            grid: [8, 32]
          },
          ease: 'power2.out'
        }
      );
      // Color the '1' bits
      bitRefs.current.forEach((bit, i) => {
        if (bit && newBinary[i] === '1') {
          tl.to(bit, { backgroundColor: primaryColor, duration: 0.3 }, "-=0.7");
        }
      });
    } else { // Animate changes
      bitRefs.current.forEach((bit, i) => {
        if (bit && prevBinary[i] !== newBinary[i]) {
          gsap.timeline()
            .to(bit, { scale: 1.4, duration: 0.15, ease: 'power2.out' })
            .to(bit, { backgroundColor: newBinary[i] === '1' ? primaryColor : mutedColor, duration: 0.2 }, '<')
            .to(bit, { scale: 1, duration: 0.25, ease: 'back.out(1.7)' });
        }
      });
    }

    prevBinaryHashRef.current = newBinary;
  }, [binaryHash]);

  return (
    <div 
      ref={containerRef}
      className="p-4 rounded-lg bg-background/50 flex justify-center items-center border border-dashed border-border/50"
    >
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: 'repeat(32, minmax(0, 1fr))' }}
        aria-label="Hash bit visualization"
      >
        {Array.from({ length: 256 }).map((_, i) => (
          <div
            key={i}
            ref={el => { if (el) bitRefs.current[i] = el; }}
            className='h-3 w-3 sm:h-4 sm:w-4 rounded-sm'
            style={{ backgroundColor: 'hsl(var(--muted))' }}
          />
        ))}
      </div>
    </div>
  );
};

export default HashVisualization;
