import React from 'react';

export default function LoadingState({ message = 'Loading API...' }) {
  return (
    <div className="loading-state">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}
