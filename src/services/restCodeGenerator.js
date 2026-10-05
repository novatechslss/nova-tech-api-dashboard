export function generateCodeExamples({ url, method = 'GET', body = '', headers = {} }) {
  const finalUrl = String(url || '');
  const safeUrl = JSON.stringify(finalUrl);
  const cleanHeaders = headers || {};
  const headerJson = JSON.stringify(cleanHeaders, null, 2);
  const prettyBody = typeof body === 'string' ? body : JSON.stringify(body ?? '', null, 2);

  const curlBody = prettyBody
    ? ` \\\n  --header 'Content-Type: application/json' \\\n  --data '${prettyBody.replace(/'/g, "'\\''")}'`
    : '';

  const curl = `curl --request ${method.toUpperCase()} \\\n  --url ${safeUrl} \\\n  --header 'Accept: application/json'${curlBody}`;

  const fetchExample = `fetch(${safeUrl}, {
  method: '${method.toUpperCase()}',
  headers: ${headerJson},${prettyBody ? `
  body: ${JSON.stringify(prettyBody)},` : ''}
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
