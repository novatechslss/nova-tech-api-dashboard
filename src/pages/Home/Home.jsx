import React from 'react';
import { apiCatalog } from '../../app/router';
import ApiMenu from '../../components/ApiMenu/ApiMenu';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <div className="eyebrow">API Dashboard</div>
        <h1 className="hero-title">NOVA TECH API</h1>
        <p className="hero-subtitle">Premium React dashboard with 20 public API modules, health checks, and REST examples. Test, monitor, and document APIs in real-time.</p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Available APIs</h2>
          <span className="tiny-pill">{apiCatalog.length} modules</span>
        </div>
        <ApiMenu items={apiCatalog} />
      </div>
    </div>
  );
}