import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import AllApisPage from './pages/AllApis';
import ApiMonitorPage from './pages/ApiMonitor';
import DocumentationPage from './pages/Documentation';
import RestExamplesPage from './pages/RestExamples';
import SettingsPage from './pages/Settings';
import ApiModulePage from './components/ApiModulePage';
import apiLibrary from './data/apiLibrary';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-apis" element={<AllApisPage />} />
          <Route path="/api-monitor" element={<ApiMonitorPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/rest-examples" element={<RestExamplesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {apiLibrary.map((api) => (
            <Route
              key={api.slug}
              path={`/api/${api.slug}`}
              element={<ApiModulePage api={api} />}
            />
          ))}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}
