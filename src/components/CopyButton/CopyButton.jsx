import React from 'react';

export default function CopyButton({ text }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      console.warn('Copy failed');
    }
  };

  return <button type="button" className="button button-secondary" onClick={copy}>Copy</button>;
}
