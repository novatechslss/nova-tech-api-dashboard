import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ApiMenu({ items = [] }) {
  return (
    <div className="api-grid">
      {items.map((api) => (
        <NavLink key={api.route} to={api.route} className="api-card-link">
          <article className="api-card">
            <div className="api-card-header">
              <div className="api-card-title-box">
                <div className="api-icon">{api.icon}</div>
                <div>
                  <h3 className="api-card-title">{api.name}</h3>
                  <div className="api-card-meta">
                    <span>{api.category}</span>
                  </div>
                </div>
              </div>
              <span className="status-badge status-online">online</span>
            </div>
            <p className="api-card-desc">{api.description}</p>
            <button className="button button-primary" type="button">
              Open API
            </button>
          </article>
        </NavLink>
      ))}
    </div>
  );
}
