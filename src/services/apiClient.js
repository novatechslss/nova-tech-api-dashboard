export function validateUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function normalizeHeaders(rawHeaders) {
  if (!rawHeaders) return {};
  if (typeof rawHeaders.entries === 'function') {
    return Object.fromEntries(rawHeaders.entries());
  }
  if (typeof rawHeaders.forEach === 'function') {
    const out = {};
    rawHeaders.forEach((value, key) => {
      out[key] = value;
    });
    return out;
  }
  return rawHeaders;
}

export async function makeRequest({ url, method = 'GET', body = null, headers = {}, timeout = 15000 }) {
  if (!validateUrl(url)) {
    throw new Error('Invalid URL. Use http:// or https:// only.');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const startedAt = performance.now();
  const fetchHeaders = { ...headers };

  if (body && !fetchHeaders['Content-Type'] && !fetchHeaders['content-type']) {
    fetchHeaders['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      method,
      headers: fetchHeaders,
      body: body && method !== 'GET' && method !== 'HEAD' ? body : undefined,
      signal: controller.signal,
    });

    const rawText = await response.text();
    let payload = rawText;
    try {
      payload = rawText ? JSON.parse(rawText) : null;
    } catch {
      payload = rawText;
    }

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: normalizeHeaders(response.headers),
      data: payload,
      text: rawText,
      timeMs: Math.round(performance.now() - startedAt),
      error: null,
    };
  } catch (error) {
    const message = error?.name === 'AbortError' ? 'Request timed out.' : error?.message || 'Request failed';
    const friendly = /Failed to fetch|TypeError|NetworkError|fetch/i.test(message)
      ? 'Browser access blocked by CORS; server availability not confirmed.'
      : message;

    return {
      ok: false,
      status: 0,
      statusText: 'Request failed',
      headers: {},
      data: null,
      text: '',
      timeMs: Math.round(performance.now() - startedAt),
      error: friendly,
    };
  } finally {
    clearTimeout(timer);
  }
}
