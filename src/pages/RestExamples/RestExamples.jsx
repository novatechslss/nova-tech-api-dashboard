import React from 'react';
import { generateRestCode } from '../../services/restCodeGenerator';

export default function RestExamplesPage() {
  const example = generateRestCode({
    method: 'GET',
    url: 'https://api.example.com/data',
    body: null,
  });

  return (
    <div className="api-page">
      <div className="panel hero-panel">
        <div className="eyebrow">Code</div>
        <h1 className="page-title">REST Examples</h1>
        <p className="page-subtitle">Learn how NOVA TECH generates REST code examples automatically.</p>
      </div>

      <div className="panel">
        <h3>cURL Example</h3>
        <div className="output-box">
          <pre>{example.curl}</pre>
        </div>
      </div>

      <div className="panel">
        <h3>JavaScript Fetch Example</h3>
        <div className="output-box">
          <pre>{example.fetch}</pre>
        </div>
      </div>

      <div className="panel">
        <h3>Python Example</h3>
        <div className="output-box">
          <pre>{example.python}</pre>
        </div>
      </div>
    </div>
  );
}