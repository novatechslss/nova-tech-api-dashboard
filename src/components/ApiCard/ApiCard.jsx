import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ApiCard({ name, description, icon, category, route, status = 'online' }) {
  const navigate = useNavigate();

  return (
    <article className="api-card">
      <div className="api-card-header">
        <div className="api-card-title-box">
          <div className="api-icon">{icon}</div>
          <div>
            <h3 className="api-card-title">{name}</h3>
            <div className="api-card-meta">
              <span>{category}</span>
            </div>
          </div>
        </div>
        <span className={`status-badge ${status === 'online' ? 'status-online' : status === 'error' ? 'status-error' : status === 'blocked' ? 'status-blocked' : 'status-unknown'}`}>
          {status}
        </span>
      </div>
      <p className="api-card-desc">{description}</p>
      <button className="button button-primary" onClick={() => navigate(route)}>
        Open API
      </button>
    </article>
  );
}
