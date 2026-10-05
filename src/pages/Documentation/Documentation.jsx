import React from 'react';

export default function DocumentationPage() {
  return (
    <div className="api-page">
      <div className="panel hero-panel">
        <div className="eyebrow">Guide</div>
        <h1 className="page-title">Documentation</h1>
        <p className="page-subtitle">Learn how to use NOVA TECH API dashboard effectively.</p>
      </div>

      <div className="panel">
        <h2>Getting Started</h2>
        <p>NOVA TECH is a premium React dashboard for testing 20 public APIs with real-time health checks and REST code generation.</p>

        <h3>Features</h3>
        <ul>
          <li>Test 20 public APIs directly from your browser</li>
          <li>Real-time health checks and status monitoring</li>
          <li>Auto-generate cURL, Fetch, and Python code</li>
          <li>Session-based statistics tracking</li>
          <li>Responsive design (mobile, tablet, desktop)</li>
          <li>CORS-aware error handling</li>
          <li>No database or authentication required</li>
        </ul>

        <h3>How to Use</h3>
        <ol>
          <li>Click "Home" to see all available APIs</li>
          <li>Select an API to open its dedicated page</li>
          <li>Click "Test API" to run a request</li>
          <li>View the response, headers, and timing</li>
          <li>Copy REST code examples for your project</li>
          <li>Track statistics in API Monitor</li>
        </ol>

        <h3>Architecture</h3>
        <p>Each API is completely modular:</p>
        <ul>
          <li>Own folder with dedicated page component</li>
          <li>Own configuration file</li>
          <li>Own route in the router</li>
          <li>Shared services for HTTP, health checks, and statistics</li>
        </ul>
      </div>
    </div>
  );
}