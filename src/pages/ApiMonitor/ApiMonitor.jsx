import React, { useState, useEffect } from 'react';
import { getStatistics } from '../../services/statistics';
import StatCard from '../../components/StatCard/StatCard';

export default function ApiMonitorPage() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    setStats(getStatistics());
  }, []);

  const totalRequests = Object.values(stats).reduce((sum, s) => sum + (s.count || 0), 0);
  const totalSuccess = Object.values(stats).reduce((sum, s) => sum + (s.success || 0), 0);
  const avgTime = totalRequests > 0 ? Math.round(Object.values(stats).reduce((sum, s) => sum + (s.duration || 0), 0) / Object.keys(stats).length) : 0;

  return (
    <div className="api-page">
      <div className="panel hero-panel">
        <div className="eyebrow">Session Monitor</div>
        <h1 className="page-title">API Monitor</h1>
        <p className="page-subtitle">Real-time statistics of your API requests in this browser session.</p>
      </div>

      <div className="panel">
        <div className="stats-grid">
          <StatCard label="Total Requests" value={totalRequests} />
          <StatCard label="Successful" value={totalSuccess} tone="success" />
          <StatCard label="Failed" value={totalRequests - totalSuccess} tone="failed" />
          <StatCard label="Average Time" value={`${avgTime}ms`} />
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>API Statistics</h3>
        </div>
        <div className="list-stack">
          {Object.entries(stats).map(([api, data]) => (
            <div key={api} className="row-item">
              <div className="list-meta">
                <strong>{api}</strong>
                <span className="tiny-muted">{data.count || 0} requests</span>
              </div>
              <div className="list-meta">
                <span className="small" style={{ color: 'var(--green)' }}>✓ {data.success || 0}</span>
                <span className="small" style={{ color: 'var(--red)' }}>✗ {data.failed || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}