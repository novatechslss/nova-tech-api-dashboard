import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Globe2, Search, Terminal, BookOpen, Settings, Activity } from 'lucide-react';
import apiLibrary from '../data/apiLibrary';

const navItems = [
  { to: '/', label: 'Home', icon: Activity },
  { to: '/all-apis', label: 'All APIs', icon: Search },
  { to: '/api-monitor', label: 'API Monitor', icon: Activity },
  { to: '/documentation', label: 'Documentation', icon: BookOpen },
  { to: '/rest-examples', label: 'REST Examples', icon: Terminal },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="NOVA TECH API home">
          <span className="brand-mark">
            <Globe2 size={18} />
          </span>
          <span>NOVA TECH API</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Open API menu"
        >
          <Menu size={16} />
          Menu
        </button>
      </div>

      {open && (
        <>
          <div className="sidebar-overlay" onClick={() => setOpen(false)} />
          <aside className="sidebar" aria-label="API drawer">
            <div className="sidebar-header">
              <strong>API Modules ({apiLibrary.length})</strong>
              <button type="button" className="menu-button" onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-list">
                {apiLibrary.map((api) => (
                  <Link
                    key={api.slug}
                    to={`/api/${api.slug}`}
                    className="sidebar-item"
                    onClick={() => setOpen(false)}
                  >
                    <div>
                      <strong>{api.name}</strong>
                      <div className="tiny-muted">{api.category}</div>
                    </div>
                    <span className="tiny-pill">{api.defaultMethod}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}
