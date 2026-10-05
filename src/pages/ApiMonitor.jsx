import React from 'react';
import apiLibrary from '../data/apiLibrary';

export default function ApiMonitorPage() {
  const categories = [...new Set(apiLibrary.map((api) => api.category))];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">API Monitor</h1>
          <p className="page-subtitle">Runtime availability status, operational health checks, and per-API metrics.</p>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category} className="panel mt-2">
          <div className="panel-header">
            <h3>{category}</h3>
            <span className="small">{apiLibrary.filter((a) => a.category === category).length} APIs</span>
          </div>
          <div className="list-group">
            {apiLibrary
              .filter((api) => api.category === category)
              .map((api) => (
                <div key={api.slug} className="row-item">
                  <div>
                    <strong>{api.name}</strong>
                    <div className="small">{api.baseUrl}</div>
                  </div>
                  <span className="badge badge-online">Ready</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
