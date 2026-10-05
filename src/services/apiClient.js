export function validateUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function getSafeJson(data) {
  if (data === undefined || data === null) return 'null';
  if (typeof data === 'string') return JSON.stringify(data, null, 2);
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
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
  const fetchHeaders = { ...headers };

  if (body && !fetchHeaders['Content-Type'] && !fetchHeaders['content-type']) {
    fetchHeaders['Content-Type'] = 'application/json';
  }

  const startedAt = performance.now();

  try {
    const response = await fetch(url, {
      method,
      headers: fetchHeaders,
      body: body && method !== 'GET' && method !== 'HEAD' ? body : undefined,
      signal: controller.signal,
    });

    const rawText = await response.text();
    let payload = rawText;
    let parsed = null;

    if (rawText) {
      try {
        parsed = JSON.parse(rawText);
        payload = parsed;
      } catch {
        payload = rawText;
      }
    }

    const timeMs = Math.round(performance.now() - startedAt);

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: normalizeHeaders(response.headers),
      data: payload,
      text: rawText,
      timeMs,
      error: null,
    };
  } catch (error) {
    const e = error;
    const timeMs = Math.round(performance.now() - startedAt);

    let message = e?.message || 'Request failed';
    if (e?.name === 'AbortError') {
      message = 'Request timed out.';
    }

    if (message.includes('Failed to fetch') || message.includes('NetworkError') || message.includes('TypeError')) {
      message = 'Browser access blocked by CORS; server availability not confirmed';
    }

    return {
      ok: false,
      status: 0,
      statusText: 'Request failed',
      headers: {},
      data: null,
      text: '',
      timeMs,
      error: message,
    };
  } finally {
    clearTimeout(timer);
  }
}
