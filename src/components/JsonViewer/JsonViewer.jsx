import React from 'react';

export default function JsonViewer({ data }) {
  return (
    <div className="output-box">
      <pre>{typeof data === 'string' ? data : JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
