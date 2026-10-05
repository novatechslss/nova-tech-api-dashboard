import React, { useState } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { resetAllStats, getSessionSummary } from '../services/statistics';
import apiLibrary from '../data/apiLibrary';

export default function SettingsPage() {
  const [showReset, setShowReset] = useState(false);
  const summary = getSessionSummary();

  const handleResetStats = () => {
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
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Local UI preferences, session behavior, and local statistics management.</p>
        </div>
      </div>

      <div className="grid-two">
        <div className="panel">
          <h3>Application config</h3>
          <div className="table-list">
            <div className="table-row"><span>Theme</span><strong>Dark system</strong></div>
            <div className="table-row"><span>Request timeout</span><strong>15 seconds</strong></div>
            <div className="table-row"><span>Session storage</span><strong>Local browser only</strong></div>
            <div className="table-row"><span>Data retention</span><strong>Current session</strong></div>
            <div className="table-row"><span>CORS handling</span><strong>Browser native + notice</strong></div>
          </div>
        </div>

        <div className="panel">
          <h3>API modules</h3>
          <div className="table-list">
            <div className="table-row"><span>Total APIs</span><strong>{apiLibrary.length}</strong></div>
            <div className="table-row"><span>Categories</span><strong>{new Set(apiLibrary.map((a) => a.category)).size}</strong></div>
            <div className="table-row"><span>Default timeout</span><strong>15000 ms</strong></div>
            <div className="table-row"><span>Supported methods</span><strong>GET, POST, PUT, DELETE</strong></div>
          </div>
        </div>
      </div>

      <div className="panel mt-2">
        <h3>Session statistics</h3>
        <div className="table-list">
          <div className="table-row"><span>Total requests</span><strong>{summary.totalRequests}</strong></div>
          <div className="table-row"><span>Successful</span><strong>{summary.successful}</strong></div>
          <div className="table-row"><span>Failed (HTTP)</span><strong>{summary.httpFailures}</strong></div>
          <div className="table-row"><span>Failed (Network)</span><strong>{summary.networkFailures}</strong></div>
          <div className="table-row"><span>Average response</span><strong>{Math.round(summary.averageResponseTime)} ms</strong></div>
        </div>
      </div>

      <div className="panel mt-2">
        <div className="panel-header">
          <h3>Danger zone</h3>
          <AlertCircle size={18} style={{ color: 'var(--red)' }} />
        </div>
        <div className="notice error mb-2">
          <strong>Reset all statistics:</strong> Clear all local session data and metrics. This action cannot be undone.
        </div>
        {!showReset ? (
          <button type="button" className="button-danger" onClick={() => setShowReset(true)}>
            <RefreshCcw size={14} style={{ marginRight: 6 }} />
            Reset all statistics
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="button-danger" onClick={handleResetStats}>
              Confirm reset
            </button>
            <button type="button" className="button-secondary" onClick={() => setShowReset(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
