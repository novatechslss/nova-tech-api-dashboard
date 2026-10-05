export function generateCodeExamples({ url, method = 'GET', body = '', headers = {} }) {
  const finalUrl = String(url || '');
  const safeUrl = JSON.stringify(finalUrl);
  const prettyBody = body && typeof body === 'string' ? body : '';
  const headerJson = JSON.stringify(headers, null, 2) || '{}';
  const requestBody = prettyBody ? `\n  body: ${JSON.stringify(prettyBody)}` : '';

  const curl = `curl --request ${method.toUpperCase()} \\\n  --url ${safeUrl} \\\n  --header 'Content-Type: application/json'${prettyBody ? ` \\\n  --data '${prettyBody.replace(/'/g, "'\\''")}'` : ''}`;

  const fetchExample = `fetch(${safeUrl}, {
  method: '${method.toUpperCase()}',
  headers: ${headerJson},${requestBody}
})
  .then(async (response) => {
    const data = await response.json();
    console.log(data);
    return data;
  })
  .catch((error) => console.error(error));`;

  const pythonExample = `import requests

response = requests.request(
    method='${method.toUpperCase()}',
    url=${safeUrl},
    headers=${headerJson},
    data=${prettyBody ? JSON.stringify(prettyBody) : 'None'},
    timeout=15,
)

print(response.status_code)
print(response.text)
`;

  return { curl, fetch: fetchExample, python: pythonExample };
}
