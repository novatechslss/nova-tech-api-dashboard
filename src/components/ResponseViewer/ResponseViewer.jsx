import React from 'react';

export default function ResponseViewer({ title, data }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h3>{title}</h3>
      </div>
      <div className="output-box">
        <pre>{typeof data === 'string' ? data : JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
