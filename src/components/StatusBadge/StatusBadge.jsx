import React from 'react';

export default function StatusBadge({ label = 'Online', status = 'online' }) {
  const className = status === 'online' ? 'status-online' : status === 'error' ? 'status-error' : status === 'blocked' ? 'status-blocked' : 'status-unknown';
  return <span className={`status-badge ${className}`}>{label}</span>;
}
