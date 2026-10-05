import React from 'react';
import apiLibrary from '../data/apiLibrary';

export default function DocumentationPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Documentation</h1>
          <p className="page-subtitle">Developer guide, configuration, API authentication, error handling, and CORS behavior.</p>
        </div>
      </div>

      <div className="panel">
        <h3>Getting started</h3>
        <p className="small">
          NOVA TECH API dashboard provides a centralized hub for testing and documenting public APIs. Each API module
          includes real-time health checks, request/response inspection, automatic code generation for cURL, Fetch, and Python,
          and local session-based statistics.
        </p>
        <p className="small">
          <strong>No authentication required.</strong> This is a public developer tool with no login, database, or user accounts.
        </p>
      </div>

      <div className="grid-two mt-2">
        <div className="panel">
          <h3>How it works</h3>
          <p className="small">
            <strong>1. Select an API module</strong> from the directory or browse by category.
          </p>
          <p className="small">
            <strong>2. Verify the endpoint URL</strong> and choose an HTTP method (GET, POST, PUT, DELETE).
          </p>
          <p className="small">
            <strong>3. Click "Test API"</strong> to make a real fetch request and inspect the live response.
          </p>
          <p className="small">
            <strong>4. Copy generated code</strong> for cURL, JavaScript Fetch, or Python Requests.
          </p>
          <p className="small">
            <strong>5. Monitor metrics</strong> — total requests, success/failure counts, and average response time are tracked locally.
          </p>
        </div>

        <div className="panel">
          <h3>Important notes</h3>
          <p className="small">
            <strong>Local statistics only:</strong> All metrics are stored in the browser session. They are not sent to a server.
          </p>
          <p className="small">
            <strong>CORS awareness:</strong> If a public API blocks browser requests due to CORS, the UI will show "Blocked" and display
            an informational message instead of falsely reporting the server as offline.
          </p>
          <p className="small">
            <strong>No API keys embedded:</strong> Private credentials are never stored or transmitted. Use environment variables
            or backend proxies for authenticated APIs.
          </p>
          <p className="small">
            <strong>Rate limits:</strong> Some public APIs may rate-limit requests. The dashboard respects their policies.
          </p>
        </div>
      </div>

      <div className="panel mt-2">
        <h3>Supported APIs</h3>
        <div className="list-group" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {apiLibrary.map((api) => (
            <div key={api.slug} className="row-item">
              <div>
                <strong>{api.name}</strong>
                <div className="small">{api.category} • {api.defaultMethod}</div>
              </div>
              <span className="small">{api.baseUrl}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel mt-2">
        <h3>Error handling</h3>
        <div className="notice warn mb-2">
          <strong>Request timeout:</strong> Default 15 seconds. If a request takes longer, it will be aborted and reported as a timeout.
        </div>
        <div className="notice error mb-2">
          <strong>HTTP errors:</strong> Status codes 400+ are displayed with the actual error message from the server.
        </div>
        <div className="notice error mb-2">
          <strong>Network errors:</strong> CORS blocks, DNS failures, and connection refused errors are shown accurately.
        </div>
      </div>
    </div>
  );
}
