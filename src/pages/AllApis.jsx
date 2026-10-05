import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import apiLibrary from '../data/apiLibrary';
import { getSessionSummary, getApiStats } from '../services/statistics';
import StatusBadge from '../components/StatusBadge';

export default function AllApisPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(apiLibrary.map((api) => api.category))];
  const summary = getSessionSummary();

  const filtered = useMemo(() => {
    return apiLibrary.filter((api) => {
      const haystack = `${api.name} ${api.description} ${api.category}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      const matchesCategory = category === 'All' || api.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="eyebrow">DISCOVER</div>
          <h1 className="page-title">API Explorer</h1>
          <p className="page-subtitle">Browse all public endpoints, inspect metadata, and test them live from one shared developer console.</p>
        </div>
      </div>

      <div className="panel">
        <div className="search-box">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search API by name, category or description" />
        </div>

        <div className="chip-wrap">
          {categories.map((value) => (
            <button
              key={value}
              type="button"
              className={`chip ${category === value ? 'active' : ''}`}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-grid grid-4 mt-16">
        <div className="stat-card">
          <div className="stat-label">Local requests</div>
          <div className="stat-value">{summary.totalRequests}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Success</div>
          <div className="stat-value success">{summary.successful}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">HTTP failures</div>
          <div className="stat-value failed">{summary.httpFailures}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg time</div>
          <div className="stat-value">{Math.round(summary.averageResponseTime || 0)} ms</div>
        </div>
      </div>

      <div className="api-grid mt-16">
        {filtered.map((api) => {
          const stats = getApiStats(api.slug);
          return (
            <Link to={`/api/${api.slug}`} key={api.slug} className="api-card">
              <div className="api-card-header">
                <div className="api-card-title-box">
                  <div className="api-icon">{api.icon}</div>
                  <div>
                    <h3 className="api-card-title">{api.name}</h3>
                  </div>
                </div>
                <StatusBadge status={stats.totalRequests > 0 ? 'online' : 'unknown'} label={stats.totalRequests > 0 ? 'READY' : 'NEW'} />
              </div>
              <p className="api-card-desc">{api.description}</p>
              <div className="api-card-meta">
                <span>{api.category}</span>
                <span>{api.defaultMethod}</span>
                <span>{api.baseUrl}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
