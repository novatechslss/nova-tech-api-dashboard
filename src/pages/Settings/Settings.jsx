import React from 'react';
import { resetStatistics, getStatistics } from '../../services/statistics';

export default function SettingsPage() {
  const handleReset = () => {
    if (window.confirm('Clear all statistics? This cannot be undone.')) {
      resetStatistics();
      window.location.reload();
    }
  };

  const stats = getStatistics();
  const hasData = Object.keys(stats).length > 0;

  return (
    <div className="api-page">
      <div className="panel hero-panel">
        <div className="eyebrow">Preferences</div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Configure NOVA TECH dashboard preferences and manage data.</p>
      </div>

      <div className="panel">
        <h3>Session Data</h3>
        <p>NOVA TECH stores statistics locally in your browser session using localStorage. No data is sent to servers.</p>
        <p><strong>Current stats:</strong> {Object.keys(stats).length} APIs tracked</p>
        {hasData && <button type="button" className="button button-danger" onClick={handleReset}>Clear All Statistics</button>}
      </div>

      <div className="panel">
        <h3>About NOVA TECH</h3>
        <p>Premium React.js API dashboard for testing, monitoring, and documenting public APIs.</p>
        <ul>
          <li>React 18 + Vite</li>
          <li>React Router 6</li>
          <li>Lucide React Icons</li>
          <li>Vanilla CSS (no dependencies)</li>
          <li>Vitest for testing</li>
        </ul>
      </div>
    </div>
  );
}