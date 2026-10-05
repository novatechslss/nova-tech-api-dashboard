import React, { useMemo, useState } from 'react';
import { TerminalSquare, ShieldCheck, BookOpenText } from 'lucide-react';
import apiLibrary from '../data/apiLibrary';

export default function DocumentationPage() {
  const categories = [...new Set(apiLibrary.map((api) => api.category))];
  const [active, setActive] = useState('Overview');

  const sections = useMemo(
    () => ({
      Overview:
        'NOVA TECH API is a premium public API browser and request-testing console built with Vite and React. It provides local session tracking, real HTTP testing, response inspection, and code generation for cURL, JavaScript Fetch, and Python Requests.',
      'API Modules': `The platform currently includes ${apiLibrary.length} modules across categories such as ${categories.join(', ')}.`,
      'HTTP Methods': 'Use standard methods such as GET, POST, PUT, PATCH, and DELETE based on the API contract. Health and data endpoints are usually GET, while write operations are POST or PUT.',
      'CORS & Errors': 'When browser CORS blocks access, the UI reports that the server availability cannot be confirmed instead of incorrectly saying the API is offline.',
      Security: 'All URLs are validated to allow only http:// and https://. Responses are rendered as safe text and never executed as HTML or JavaScript.',
      'Adding APIs': 'Add a new API by extending the apiLibrary configuration and linking the route to the shared module page.',
    }),
    [categories]
  );

  return (
    <div className="documentation-page">
      <div className="page-header">
        <div>
          <div className="eyebrow">DOCS</div>
          <h1 className="page-title">Developer Documentation</h1>
          <p className="page-subtitle">Learn how the dashboard works, how to interpret results, and how to safely test public endpoints.</p>
        </div>
      </div>

      <div className="two-column-grid">
        <div className="panel sidebar-doc-nav">
          <div className="panel-header">
            <h3>Contents</h3>
          </div>
          <div className="doc-nav-list">
            {Object.keys(sections).map((key) => (
              <button key={key} type="button" className={`doc-nav-item ${active === key ? 'active' : ''}`} onClick={() => setActive(key)}>
                {key}
              </button>
            ))}
          </div>
        </div>

        <div className="panel doc-panel">
          <div className="panel-header">
            <h3>{active}</h3>
            {active === 'CORS & Errors' ? <ShieldCheck size={18} /> : active === 'Adding APIs' ? <BookOpenText size={18} /> : <TerminalSquare size={18} />}
          </div>
          <p>{sections[active]}</p>
          <div className="doc-grid">
            <div>
              <strong>Local statistics</strong>
              <p>Request counts, success/failure totals, and average response times are stored only in the browser session. They are not global or shared across users.</p>
            </div>
            <div>
              <strong>API keys</strong>
              <p>Authenticated APIs require a backend or environment variable. The frontend should never expose private credentials.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
