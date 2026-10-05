import React from 'react';

export default function ErrorState({ message = 'Something went wrong.' }) {
  return <div className="notice error">{message}</div>;
}
