import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import AppRouter from './router';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Sidebar />
      <main className="page-shell">
        <AppRouter />
      </main>
    </div>
  );
}
