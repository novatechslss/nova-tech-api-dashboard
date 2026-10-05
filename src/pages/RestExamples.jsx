import React, { useState } from 'react';
import { Search } from 'lucide-react';
import apiLibrary from '../data/apiLibrary';
import { generateCodeExamples } from '../services/restCodeGenerator';

export default function RestExamplesPage() {
  const [selectedApi, setSelectedApi] = useState(apiLibrary[0]);
  const [copied, setCopied] = useState('');

  const code = generateCodeExamples({
    url: `${selectedApi.baseUrl}${selectedApi.defaultPath}`,
    method: selectedApi.defaultMethod,
    body: selectedApi.sampleBody || '',
    headers: { Accept: 'application/json' },
  });

  const copyCode = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(''), 1200);
    } catch {
      setCopied('');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="eyebrow">API SAMPLES</div>
          <h1 className="page-title">REST Examples</h1>
          <p className="page-subtitle">Reusable cURL, Fetch, and Python snippets for all modules in this catalog.</p>
        </div>
      </div>

      <div className="two-column-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>Choose API</h3>
            <Search size={16} />
          </div>
          <div className="list-group" style={{ maxHeight: '480px', overflowY: 'auto' }}>
            {apiLibrary.map((api) => (
              <button
                key={api.slug}
                type="button"
                className={`row-item ${selectedApi.slug === api.slug ? 'selected' : ''}`}
                onClick={() => setSelectedApi(api)}
              >
                <div>
                  <strong>{api.name}</strong>
                  <div className="small">{api.category}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="panel response-panel">
          <div className="panel-header">
            <h3>{selectedApi.name}</h3>
          </div>
          <div className="small mb-2">{selectedApi.baseUrl}{selectedApi.defaultPath}</div>
          <div className="small mb-2">{selectedApi.description}</div>

          <div className="code-section">
            <strong>cURL</strong>
            <div className="output-box mt-2">
              <pre>{code.curl}</pre>
            </div>
            <button type="button" className="button button-secondary mt-2" onClick={() => copyCode(code.curl, 'curl')}>
              {copied === 'curl' ? 'Copied' : 'Copy cURL'}
            </button>
          </div>

          <div className="code-section">
            <strong>Fetch API</strong>
            <div className="output-box mt-2">
              <pre>{code.fetch}</pre>
            </div>
            <button type="button" className="button button-secondary mt-2" onClick={() => copyCode(code.fetch, 'fetch')}>
              {copied === 'fetch' ? 'Copied' : 'Copy Fetch'}
            </button>
          </div>

          <div className="code-section">
            <strong>Python Requests</strong>
            <div className="output-box mt-2">
              <pre>{code.python}</pre>
            </div>
            <button type="button" className="button button-secondary mt-2" onClick={() => copyCode(code.python, 'python')}>
              {copied === 'python' ? 'Copied' : 'Copy Python'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
