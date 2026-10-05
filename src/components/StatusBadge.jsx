import React from 'react';

export default function StatusBadge({ status = 'unknown', label = 'UNKNOWN' }) {
  const statusClass =
    status === 'online'
      ? 'status-online'
      : status === 'error'
        ? 'status-error'
        : status === 'blocked'
          ? 'status-blocked'
          : 'status-unknown';

  return <span className={`status-badge ${statusClass}`}>{label}</span>;
}
