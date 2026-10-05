import React, { useState } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { getSessionSummary, resetAllStats } from '../services/statistics';
import apiLibrary from '../data/apiLibrary';

export default function SettingsPage() {
  const [showReset, setShowReset] = useState(false);
  const summary = getSessionSummary();

  const handleReset = () => {
    if (showReset) {
      resetAllStats();
      setShowReset(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="eyebrow">PREFERENCES</div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Local UI preferences and browser-session stats management.</p>
        </div>
      </div>

      <div className="two-column-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>Application</h3>
          </div>
          <div className="table-list">
            <div className="table-row"><span>Theme</span><strong>Dark</strong></div>
            <div className="table-row"><span>Request timeout</span><strong>15 seconds</strong></div>
            <div className="table-row"><span>Storage</span><strong>Browser local session</strong></div>
            <div className="table-row"><span>Data retention</span><strong>Current session</strong></div>
            <div className="table-row"><span>CORS handling</span><strong>Browser native + warning</strong></div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>API modules</h3>
          </div>
          <div className="table-list">
            <div className="table-row"><span>Total APIs</span><strong>{apiLibrary.length}</strong></div>
            <div className="table-row"><span>Categories</span><strong>{new Set(apiLibrary.map((api) => api.category)).size}</strong></div>
            <div className="table-row"><span>Default timeout</span><strong>15000 ms</strong></div>
            <div className="table-row"><span>Supported methods</span><strong>GET, POST, PUT, DELETE</strong></div>
          </div>
        </div>
      </div>

      <div className="panel mt-2">
        <div className="panel-header">
          <h3>Session statistics</h3>
        </div>
        <div className="table-list">
          <div className="table-row"><span>Total requests</span><strong>{summary.totalRequests}</strong></div>
          <div className="table-row"><span>Successful</span><strong>{summary.successful}</strong></div>
          <div className="table-row"><span>Failed (HTTP)</span><strong>{summary.httpFailures}</strong></div>
          <div className="table-row"><span>Failed (Network)</span><strong>{summary.networkFailures}</strong></div>
          <div className="table-row"><span>Average response</span><strong>{Math.round(summary.averageResponseTime || 0)} ms</strong></div>
        </div>
      </div>

      <div className="panel mt-2">
        <div className="panel-header">
          <h3>Danger zone</h3>
          <AlertTriangle size={18} className="danger-text" />
        </div>
        <div className="notice error mb-2">
          <strong>Reset all statistics:</strong> Clear local browser metrics and request history. This does not affect any remote APIs.
        </div>
        {!showReset ? (
          <button type="button" className="button button-danger" onClick={() => setShowReset(true)}>
            <RefreshCcw size={14} /> Reset all statistics
          </button>
        ) : (
          <div className="button-row">
            <button type="button" className="button button-danger" onClick={handleReset}>Confirm reset</button>
            <button type="button" className="button button-secondary" onClick={() => setShowReset(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
