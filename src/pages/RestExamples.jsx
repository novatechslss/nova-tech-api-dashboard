import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import apiLibrary from '../data/apiLibrary';

export default function RestExamplesPage() {
  const [selectedApi, setSelectedApi] = useState(apiLibrary[0]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">REST Examples</h1>
          <p className="page-subtitle">Reusable request samples for cURL, Fetch, and Python across all modules.</p>
        </div>
      </div>

      <div className="grid-two">
        <div className="panel">
          <div className="panel-header">
            <h3>Choose an API</h3>
            <Search size={16} />
          </div>
          <div className="list-group" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {apiLibrary.map((api) => (
              <button
                key={api.slug}
                type="button"
                className="row-item"
                onClick={() => setSelectedApi(api)}
                style={{
                  background: selectedApi.slug === api.slug ? 'rgba(100, 212, 255, 0.14)' : undefined,
                  textAlign: 'left',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <strong>{api.name}</strong>
                  <div className="small">{api.category}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="panel response-panel">
          <div className="panel-header">
            <h3>{selectedApi.name}</h3>
          </div>
          <div className="small mb-2">{selectedApi.baseUrl}</div>
          <div className="small mb-2">{selectedApi.description}</div>

          <div style={{ marginTop: 20 }}>
            <strong>cURL</strong>
            <div className="output-box mt-2">
              <pre>{`curl --request GET \\
  --url '${selectedApi.baseUrl}${selectedApi.defaultPath}' \\
  --header 'Accept: application/json'`}</pre>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <strong>Fetch API</strong>
            <div className="output-box mt-2">
              <pre>{`fetch('${selectedApi.baseUrl}${selectedApi.defaultPath}', {
  method: '${selectedApi.defaultMethod}',
  headers: { Accept: 'application/json' },
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));`}</pre>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <strong>Python Requests</strong>
            <div className="output-box mt-2">
              <pre>{`import requests

response = requests.request(
    method='${selectedApi.defaultMethod}',
    url='${selectedApi.baseUrl}${selectedApi.defaultPath}',
    headers={'Accept': 'application/json'},
    timeout=15
)

print(response.status_code)
print(response.json())`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
