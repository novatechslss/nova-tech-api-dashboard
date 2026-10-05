import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import apiLibrary from '../data/apiLibrary';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/all-apis', label: 'All APIs' },
  { to: '/api-monitor', label: 'API Monitor' },
  { to: '/documentation', label: 'Documentation' },
  { to: '/rest-examples', label: 'REST Examples' },
  { to: '/settings', label: 'Settings' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="NOVA TECH API home">
          <span className="brand-mark">
            <Globe size={18} />
          </span>
          <span>NOVA TECH API</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Open API menu"
        >
          <Menu size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
          Menu
        </button>
      </div>

      {open && (
        <>
          <div className="sidebar-overlay" onClick={() => setOpen(false)} />
          <aside className="sidebar" aria-label="API drawer">
            <div className="sidebar-header">
              <strong>API Modules ({apiLibrary.length})</strong>
              <button type="button" className="menu-button" onClick={() => setOpen(false)} aria-label="Close menu">
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
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block' }}>{api.name}</strong>
                      <span className="small">{api.category}</span>
                    </div>
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
