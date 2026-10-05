import React, { useState } from 'react';

export default function Toast({ message, visible = false }) {
  const [isVisible, setIsVisible] = useState(visible);
  React.useEffect(() => {
    if (message) setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 1800);
    return () => clearTimeout(timer);
  }, [message]);

  if (!isVisible || !message) return null;
  return <div className="toast">{message}</div>;
}
