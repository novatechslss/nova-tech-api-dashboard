import React from 'react';
import { NavLink } from 'react-router-dom';
import { apiCatalog } from '../../app/router';

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">N</span>
          <span>NOVA TECH</span>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/all-apis" className="nav-link">All APIs</NavLink>
          <NavLink to="/api-monitor" className="nav-link">API Monitor</NavLink>
          <NavLink to="/documentation" className="nav-link">Documentation</NavLink>
          <NavLink to="/rest-examples" className="nav-link">REST Examples</NavLink>
          <NavLink to="/settings" className="nav-link">Settings</NavLink>
        </nav>

        <div className="desktop-sidebar">
          {apiCatalog.slice(0, 5).map((api) => (
            <NavLink key={api.route} to={api.route} className="sidebar-pill">
              {api.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
