import React from 'react';
import { apiCatalog } from '../../app/router';
import ApiMenu from '../../components/ApiMenu/ApiMenu';

export default function AllApisPage() {
  return (
    <div className="api-page">
      <div className="panel hero-panel">
        <div className="eyebrow">Complete Catalog</div>
        <h1 className="page-title">All APIs</h1>
        <p className="page-subtitle">Browse all 20 public API modules available in NOVA TECH dashboard.</p>
      </div>
      <div className="panel">
        <ApiMenu items={apiCatalog} />
      </div>
    </div>
  );
}