import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../services/apiClient';
import { assessHealth } from '../../services/healthCheck';
import { recordRequest, getStatistics } from '../../services/statistics';
import { generateRestCode } from '../../services/restCodeGenerator';
import StatusBadge from '../StatusBadge/StatusBadge';
import LoadingState from '../LoadingState/LoadingState';
import ErrorState from '../ErrorState/ErrorState';
import JsonViewer from '../JsonViewer/JsonViewer';
import CopyButton from '../CopyButton/CopyButton';

export default function ApiPageShell({ config }) {
  const navigate = useNavigate();
  const [endpoint, setEndpoint] = useState(config.sampleEndpoint || '/');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState({ status: 'unknown', label: 'Unknown', tone: 'status-unknown' });
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(getStatistics());

  const currentUrl = endpoint.startsWith('http') ? endpoint : `${config.baseUrl}${endpoint}`;

  const runRequest = async () => {
    setLoading(true);
    setError('');
    const response = await apiClient.request(currentUrl, { method: config.methods?.[0] || 'GET' }, config.timeout || 12000);
    setResult(response);
    const health = assessHealth(response);
    setStatus(health);
    recordRequest(config.name, response.success, response.timing, response.status);
    setStats(getStatistics());
    if (!response.success) {
      setError(response.error || 'Request failed');
    }
    setLoading(false);
  };

  useEffect(() => {
    runRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const code = generateRestCode({ method: config.methods?.[0] || 'GET', url: currentUrl, body: config.sampleBody || null });
  const apiStats = stats[config.name] || { count: 0, success: 0, failed: 0, duration: 0 };

  return (
    <div className="api-page">
      <div className="panel hero-panel">
        <div className="api-header-row">
          <div className="api-identity">
            <div className="api-icon large">{config.icon}</div>
            <div>
              <div className="eyebrow">{config.category}</div>
              <h1 className="page-title">{config.name}</h1>
            </div>
          </div>
          <div className="header-actions">
            <button type="button" className="button button-secondary" onClick={() => navigate('/all-apis')}>Back to API Explorer</button>
            <StatusBadge label={status.label} status={status.status} />
          </div>
        </div>
        <p className="page-subtitle">{config.description}</p>
      </div>

      <div className="panel">
        <div className="request-builder-grid">
          <div className="form-group">
            <label className="field-label">HTTP method</label>
            <input className="form-input" value={config.methods?.[0] || 'GET'} readOnly />
          </div>
          <div className="form-group">
            <label className="field-label">Endpoint</label>
            <div className="url-box">
              <input className="form-input" value={endpoint} onChange={(event) => setEndpoint(event.target.value)} />
              <button type="button" className="button button-primary" onClick={runRequest}>Test API</button>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Base URL</div>
            <div className="stat-value">{config.baseUrl}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Response time</div>
            <div className="stat-value">{result?.timing || 0} ms</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">HTTP status</div>
            <div className="stat-value">{result?.status || 0}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Last tested</div>
            <div className="stat-value">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>

        {loading && <LoadingState message={`Loading ${config.name}...`} />}
        {error && <ErrorState message={error} />}
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel-header">
            <h3>Response Viewer</h3>
            <CopyButton text={typeof result?.data === 'string' ? result.data : JSON.stringify(result?.data ?? {}, null, 2)} />
          </div>
          {result ? <JsonViewer data={result.data} /> : <div className="notice">No response yet.</div>}
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Headers</h3>
          </div>
          <div className="output-box">
            <pre>{JSON.stringify(result?.headers || {}, null, 2)}</pre>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>REST Code</h3>
        </div>
        <div className="tabs">
          <button type="button" className="tab-button active">cURL</button>
          <button type="button" className="tab-button">Fetch</button>
          <button type="button" className="tab-button">Python</button>
        </div>
        <div className="output-box">
          <pre>{code.curl}</pre>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Documentation</h3>
        </div>
        <div className="doc-grid">
          <div>
            <h4>Example request</h4>
            <div className="output-box">
              <pre>{currentUrl}</pre>
            </div>
          </div>
          <div>
            <h4>Parameters</h4>
            <ul>
              {config.parameters?.map((param) => <li key={param.name}>{param.name}: {param.description}</li>) || <li>No parameters required.</li>}
            </ul>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Request Statistics</h3>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total requests</div>
            <div className="stat-value">{apiStats.count || 0}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Success</div>
            <div className="stat-value success">{apiStats.success || 0}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Failures</div>
            <div className="stat-value failed">{apiStats.failed || 0}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg time</div>
            <div className="stat-value">{apiStats.duration || 0} ms</div>
          </div>
        </div>
      </div>
    </div>
  );
}
