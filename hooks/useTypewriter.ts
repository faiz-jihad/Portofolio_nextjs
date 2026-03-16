'use client';

import { useState, useEffect } from 'react';

export function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const delay = isDeleting ? speed / 2 : speed;

    const timeout = setTimeout(() => {
      setText(prev =>
        isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex(i => i + 1);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
}
