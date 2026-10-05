export function deriveApiHealthStatus(result) {
  if (!result) return 'unknown';
  if (result.ok && result.status >= 200 && result.status < 300) return 'online';
  if (result.error && result.error.includes('CORS')) return 'blocked';
  if (result.error || result.status >= 400 || result.status === 0) return 'error';
  return 'unknown';
}
