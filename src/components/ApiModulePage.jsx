import React, { useMemo, useEffect, useState } from 'react';
import { Copy, CopyCheck, RefreshCw, Play, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { makeRequest, validateUrl } from '../services/apiClient';
import { getApiStats, updateApiStats } from '../services/statistics';
import { deriveApiHealthStatus } from '../services/healthCheck';
import { generateCodeExamples } from '../services/restCodeGenerator';

export default function ApiModulePage({ api }) {
  const [method, setMethod] = useState(api.defaultMethod || 'GET');
  const [url, setUrl] = useState(() => {
    const base = api.baseUrl || '';
    const path = api.defaultPath || '';
    return base ? `${base}${path.startsWith('/') || path.startsWith('?') ? path : `/${path}`}` : '';
  });
  const [requestBody, setRequestBody] = useState(api.sampleBody || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('json');
  const [copied, setCopied] = useState('');
  const [stats, setStats] = useState(getApiStats(api.slug));

  const status = useMemo(() => deriveApiHealthStatus(result), [result]);

  const runRequest = async (customUrl = url) => {
    if (!validateUrl(customUrl)) {
      const invalidResult = {
        ok: false,
        status: 0,
        statusText: 'Invalid URL',
        timeMs: 0,
        data: null,
        text: '',
        headers: {},
        error: 'Please enter a valid HTTP or HTTPS URL.',
      };
      setError(invalidResult.error);
      setResult(invalidResult);
      return;
    }

    setLoading(true);
    setError('');

    const response = await makeRequest({
      url: customUrl,
      method,
      body: method === 'GET' || method === 'HEAD' ? null : requestBody,
      timeout: 15000,
      headers: { Accept: 'application/json' },
    });

    setResult(response);
    const nextStats = updateApiStats(api.slug, response);
    setStats(nextStats);
    setLoading(false);

    if (response.error) {
      setError(response.error);
    }
  };

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!active) return;
      await runRequest(url);
    };
    run();
    return () => {
      active = false;
    };
  }, []);

  const codeExamples = useMemo(
    () => generateCodeExamples({ url, method, body: requestBody, headers: { Accept: 'application/json' } }),
    [url, method, requestBody]
  );

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(''), 1200);
    } catch {
      setCopied('');
    }
  };

  const statusClass =
    status === 'online'
      ? 'status-online'
      : status === 'error'
        ? 'status-error'
        : status === 'blocked'
          ? 'status-blocked'
          : 'status-unknown';

  const statusLabel =
    status === 'online'
      ? 'ONLINE'
      : status === 'error'
        ? 'ERROR'
        : status === 'blocked'
          ? 'CORS BLOCKED'
          : 'UNKNOWN';

  return (
    <div className="api-page">
      <div className="page-header compact-top">
        <div>
          <div className="eyebrow">{api.category}</div>
          <h1 className="page-title">{api.name}</h1>
          <p className="page-subtitle">{api.description}</p>
        </div>
        <span className={`status-badge ${statusClass}`}>{statusLabel}</span>
      </div>

      <div className="panel hero-panel">
        <div className="api-header-row">
          <div className="api-identity">
            <div className="api-icon">{api.icon}</div>
            <div>
              <div className="eyebrow">{api.category}</div>
              <h2>{api.name}</h2>
            </div>
          </div>
          <div className="header-actions">
            <Link to="/all-apis" className="button button-secondary">
              <ArrowLeft size={14} /> Back to Explorer
            </Link>
            <button type="button" className="button button-primary" onClick={() => runRequest()} disabled={loading}>
              <Play size={14} /> {loading ? 'Testing...' : 'Test API'}
            </button>
          </div>
        </div>

        <div className="stats-grid small-grid">
          <div className="stat-card small-stat">
            <div className="label">HTTP Status</div>
            <div className="value">{result?.status ?? 0}</div>
          </div>
          <div className="stat-card small-stat">
            <div className="label">Response Time</div>
            <div className="value">{result?.timeMs ? `${result.timeMs} ms` : '—'}</div>
          </div>
          <div className="stat-card small-stat">
            <div className="label">Request Count</div>
            <div className="value">{stats.totalRequests || 0}</div>
          </div>
          <div className="stat-card small-stat">
            <div className="label">Avg Response</div>
            <div className="value">{stats.averageResponseTime ? `${Math.round(stats.averageResponseTime)} ms` : '—'}</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Request Builder</h3>
          <button type="button" className="button button-secondary" onClick={() => runRequest()}>
            <RefreshCw size={14} /> Retry
          </button>
        </div>

        <div className="request-builder-grid">
          <div className="form-group">
            <label className="field-label">Method</label>
            <select className="form-input" value={method} onChange={(event) => setMethod(event.target.value)}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          <div className="form-group url-row">
            <label className="field-label">Endpoint</label>
            <div className="url-box">
              <input className="form-input" value={url} onChange={(event) => setUrl(event.target.value)} />
              <button type="button" className="button button-secondary" onClick={() => copy(url, 'url')}>
                {copied === 'url' ? <CopyCheck size={14} /> : <Copy size={14} />} Copy URL
              </button>
            </div>
          </div>
        </div>

        {(api.sampleBody || method !== 'GET') && (
          <div className="form-group">
            <label className="field-label">Request Body</label>
            <textarea value={requestBody} onChange={(event) => setRequestBody(event.target.value)} className="form-textarea" rows={6} />
          </div>
        )}

        {error && <div className="alert alert-error">{error}</div>}
      </div>

      <div className="two-column-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>Response</h3>
            <span className="tiny-muted">{result?.status ? `HTTP ${result.status}` : 'No response'}</span>
          </div>

          <div className="tabs">
            <button type="button" className={tab === 'json' ? 'tab-button active' : 'tab-button'} onClick={() => setTab('json')}>Formatted JSON</button>
            <button type="button" className={tab === 'raw' ? 'tab-button active' : 'tab-button'} onClick={() => setTab('raw')}>Raw</button>
          </div>

          <div className="code-block">
            <pre>
              {tab === 'json'
                ? JSON.stringify(result?.data ?? { message: 'No data yet' }, null, 2)
                : result?.text || 'No response body.'}
            </pre>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Headers & Stats</h3>
          </div>
          <div className="mini-list">
            <div className="mini-row"><span>Base URL</span><strong>{api.baseUrl}</strong></div>
            <div className="mini-row"><span>Successes</span><strong>{stats.successfulResponses || 0}</strong></div>
            <div className="mini-row"><span>Failures</span><strong>{stats.httpFailures || 0}</strong></div>
            <div className="mini-row"><span>Network failures</span><strong>{stats.networkFailures || 0}</strong></div>
            <div className="mini-row"><span>Last request</span><strong>{stats.lastRequestTime ? new Date(stats.lastRequestTime).toLocaleString() : '—'}</strong></div>
          </div>
          <div className="headers-box">
            <strong>Response Headers</strong>
            <pre>{result && Object.keys(result.headers || {}).length ? JSON.stringify(result.headers, null, 2) : '{ }'}</pre>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Code Examples</h3>
        </div>

        <div className="tabs">
          {['curl', 'fetch', 'python'].map((name) => (
            <button
              key={name}
              type="button"
              className={tab === name ? 'tab-button active' : 'tab-button'}
              onClick={() => setTab(name)}
            >
              {name.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="code-block">
          <pre>{
            tab === 'curl'
              ? codeExamples.curl
              : tab === 'fetch'
                ? codeExamples.fetch
                : codeExamples.python
          }</pre>
        </div>

        <div className="button-row">
          <button type="button" className="button button-secondary" onClick={() => copy(codeExamples.curl, 'curl')}>
            {copied === 'curl' ? <CopyCheck size={14} /> : <Copy size={14} />} Copy cURL
          </button>
          <button type="button" className="button button-secondary" onClick={() => copy(codeExamples.fetch, 'fetch')}>
            {copied === 'fetch' ? <CopyCheck size={14} /> : <Copy size={14} />} Copy Fetch
          </button>
          <button type="button" className="button button-secondary" onClick={() => copy(codeExamples.python, 'python')}>
            {copied === 'python' ? <CopyCheck size={14} /> : <Copy size={14} />} Copy Python
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Documentation</h3>
        </div>
        <div className="doc-grid">
          <div>
            <strong>Base URL</strong>
            <p>{api.baseUrl}</p>
          </div>
          <div>
            <strong>Authentication</strong>
            <p>{api.auth || 'None'}</p>
          </div>
          <div>
            <strong>Routes</strong>
            <ul>
              {api.routes.map((route) => (
                <li key={route}>{route}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Notes</strong>
            <p>{api.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
