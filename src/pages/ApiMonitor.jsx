import React from 'react';
import apiLibrary from '../data/apiLibrary';
import { getApiStats } from '../services/statistics';
import StatusBadge from '../components/StatusBadge';

export default function ApiMonitorPage() {
  const categories = [...new Set(apiLibrary.map((api) => api.category))];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="eyebrow">OPERATIONS</div>
          <h1 className="page-title">API Monitor</h1>
          <p className="page-subtitle">Track local API health, response latency, and status across the full public catalog.</p>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category} className="panel mt-2">
          <div className="panel-header">
            <h3>{category}</h3>
            <span className="small">{apiLibrary.filter((api) => api.category === category).length} APIs</span>
          </div>
          <div className="list-group">
            {apiLibrary
              .filter((api) => api.category === category)
              .map((api) => {
                const stats = getApiStats(api.slug);
                const status = stats.totalRequests > 0 ? 'online' : 'unknown';
                return (
                  <div key={api.slug} className="row-item">
                    <div>
                      <strong>{api.name}</strong>
                      <div className="small">{api.baseUrl}</div>
                    </div>
                    <div className="list-meta">
                      <span className="tiny-muted">{stats.averageResponseTime ? `${Math.round(stats.averageResponseTime)} ms` : 'Not tested'}</span>
                      <StatusBadge status={status} label={status === 'online' ? 'Healthy' : 'Untested'} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
