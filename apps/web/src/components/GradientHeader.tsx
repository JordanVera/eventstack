import React from 'react';

interface GradientHeaderProps {
  text: string;
  className?: string;
}

export function GradientHeader({ text, className }: GradientHeaderProps) {
  return (
    <>
      {text.split('').map((char, index) => (
        <React.Fragment key={index}>
          {char === ' ' ? (
            ' '
          ) : (
            <span
              className={
                'inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent uppercase'
              }
            >
              {char}
            </span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
