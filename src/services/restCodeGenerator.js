export function generateRestCode({ method = 'GET', url = '', body = null }) {
  const safeUrl = url || 'https://api.example.com/data';
  const jsonBody = body ? JSON.stringify(body, null, 2) : null;

  return {
    curl: `curl -X ${method.toUpperCase()} "${safeUrl}"${jsonBody ? ` \\\n  -H "Content-Type: application/json" \\\n  -d '${jsonBody.replace(/'/g, "'\\''")}'` : ''}`,
    fetch: `fetch("${safeUrl}", {
  method: "${method.toUpperCase()}",
  headers: {
    "Content-Type": "application/json",
  },
  ${jsonBody ? `body: JSON.stringify(${JSON.stringify(body, null, 2)})` : ''}
});`,
    python: `import requests

response = requests.${method.toLowerCase()}("${safeUrl}"${jsonBody ? ', json=' + JSON.stringify(body) : ''})
print(response.status_code)
print(response.text)`,
  };
}
