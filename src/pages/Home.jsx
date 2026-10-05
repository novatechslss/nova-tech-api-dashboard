import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiLibrary from '../data/apiLibrary';
import { getApiStats, getSessionSummary } from '../services/statistics';
import StatusBadge from '../components/StatusBadge';

export default function HomePage() {
  const summary = getSessionSummary();
  const categories = [...new Set(apiLibrary.map((api) => api.category))];
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return apiLibrary.filter((api) => {
      const haystack = `${api.name} ${api.category} ${api.description}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [query]);

  const totalRequests = summary.totalRequests;
  const successful = summary.successful;
  const failed = summary.httpFailures + summary.networkFailures;
  const avg = Math.round(summary.averageResponseTime || 0);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="eyebrow">API OPERATIONS PLATFORM</div>
        <h1 className="hero-title">One developer hub for 20 live public APIs.</h1>
        <p className="hero-subtitle">
          Test live endpoints, inspect JSON payloads, copy request snippets, and monitor local session statistics from a premium API dashboard.
        </p>
        <div className="hero-buttons">
          <Link to="/all-apis" className="button button-primary">Explore APIs</Link>
          <Link to="/api-monitor" className="button button-secondary">API Monitor</Link>
          <Link to="/documentation" className="button button-secondary">Documentation</Link>
        </div>
      </section>

      <section className="stats-grid grid-4">
        <div className="stat-card">
          <div className="stat-label">Total APIs</div>
          <div className="stat-value">{apiLibrary.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Requests</div>
          <div className="stat-value">{totalRequests}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Successful</div>
          <div className="stat-value success">{successful}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg response</div>
          <div className="stat-value">{avg} ms</div>
        </div>
      </section>

      <section className="two-column-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>Recently tested APIs</h3>
          </div>
          <div className="list-stack">
            {apiLibrary.slice(0, 5).map((api) => {
              const stats = getApiStats(api.slug);
              return (
                <div key={api.slug} className="list-row">
                  <div>
                    <strong>{api.name}</strong>
                    <div className="tiny-muted">{api.category}</div>
                  </div>
                  <StatusBadge status={stats.totalRequests > 0 ? 'online' : 'unknown'} label={stats.totalRequests > 0 ? 'READY' : 'NEW'} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Popular categories</h3>
          </div>
          <div className="chip-wrap">
            {categories.map((category) => (
              <span key={category} className="chip">{category}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>API Explorer</h3>
        </div>

        <div className="search-box">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search API by name, category or description" />
        </div>

        <div className="api-grid">
          {filtered.map((api) => (
            <Link to={`/api/${api.slug}`} key={api.slug} className="api-card">
              <div className="api-card-header">
                <div className="api-card-title-box">
                  <div className="api-icon">{api.icon}</div>
                  <div>
                    <h3 className="api-card-title">{api.name}</h3>
                  </div>
                </div>
                <StatusBadge status={getApiStats(api.slug).totalRequests > 0 ? 'online' : 'unknown'} label={getApiStats(api.slug).totalRequests > 0 ? 'READY' : 'NEW'} />
              </div>
              <p className="api-card-desc">{api.description}</p>
              <div className="api-card-meta">
                <span>{api.category}</span>
                <span>{api.defaultMethod}</span>
                <span>{api.baseUrl}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
