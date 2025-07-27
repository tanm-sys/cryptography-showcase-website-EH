import React, { useMemo, useRef, useLayoutEffect } from 'react';
import { caesarCipher } from '@/lib/crypto';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const AlphabetMapping = ({ shift }: { shift: number }) => {
  const shiftedAlphabet = useMemo(() => caesarCipher(ALPHABET, shift).toUpperCase(), [shift]);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    charRefs.current.forEach((el, i) => {
      if (el && el.textContent !== shiftedAlphabet[i]) {
        gsap.timeline()
          .to(el, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' })
          .set(el, { textContent: shiftedAlphabet[i], y: -10 })
          .to(el, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
      }
    });
  }, [shiftedAlphabet]);

  return (
    <div className="p-4 rounded-lg bg-background/50">
      <div className="flex justify-between font-mono text-sm text-muted-foreground tracking-widest">
        {ALPHABET.split('').map(char => <span key={char} className="w-6 text-center">{char}</span>)}
      </div>
      <div className="flex justify-between text-sm text-primary/50 tracking-widest my-1">
        {'↓'.repeat(26).split('').map((char, i) => <span key={i} className="w-6 text-center">{char}</span>)}
      </div>
      <div className="flex justify-between font-mono text-base sm:text-lg text-primary font-bold tracking-widest">
        {ALPHABET.split('').map((_, i) => (
          <span
            key={i}
            ref={el => charRefs.current[i] = el}
            className="w-6 text-center inline-block"
          >
            {shiftedAlphabet[i]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AlphabetMapping;
