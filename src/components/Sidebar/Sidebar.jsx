import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { apiCatalog } from '../../app/router';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'All APIs', to: '/all-apis' },
    { label: 'API Monitor', to: '/api-monitor' },
    { label: 'Documentation', to: '/documentation' },
    { label: 'REST Examples', to: '/rest-examples' },
    { label: 'Settings', to: '/settings' },
  ];

  const drawer = (
    <aside className="sidebar-panel">
      <div className="sidebar-header">
        <strong>NOVA TECH</strong>
        <button className="button button-secondary" type="button" onClick={() => setOpen(false)}>Close</button>
      </div>

      <div className="sidebar-section">
        <h4>Menu</h4>
        <div className="sidebar-list">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="sidebar-item" onClick={() => setOpen(false)}>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h4>APIs</h4>
        <div className="sidebar-list">
          {apiCatalog.map((api) => (
            <NavLink key={api.route} to={api.route} className="sidebar-item" onClick={() => setOpen(false)}>
              <span>{api.name}</span>
              <span className="tiny-pill">{api.icon}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <button type="button" className="menu-button mobile-only" onClick={() => setOpen(true)}>
        Menu
      </button>
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}
      {open && drawer}
    </>
  );
}
