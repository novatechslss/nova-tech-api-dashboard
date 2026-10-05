/**
 * Shared API Client Service
 */
export const apiClient = {
  async request(url, options = {}, timeout = 10000) {
    if (!url || typeof url !== 'string') {
      return { success: false, status: 0, statusText: 'Invalid URL', data: null, error: 'Invalid URL provided', headers: {}, timing: 0 };
    }

    if (!/^https?:\/\//i.test(url)) {
      return { success: false, status: 0, statusText: 'Invalid Protocol', data: null, error: 'Only HTTP/HTTPS protocols are supported', headers: {}, timing: 0 };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    const startedAt = Date.now();

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      const headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      const contentType = response.headers.get('content-type') || '';
      let data = null;
      try {
        if (contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }
      } catch {
        data = null;
      }

      clearTimeout(timeoutId);

      return {
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        data,
        error: response.ok ? null : `HTTP ${response.status}`,
        headers,
        timing: Date.now() - startedAt,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      const timing = Date.now() - startedAt;
      let message = 'Network error';
      if (error.name === 'AbortError') message = `Request timeout after ${timeout}ms`;
      else if (error instanceof TypeError) message = 'CORS blocked or network unavailable';
      else if (error.message) message = error.message;

      return {
        success: false,
        status: 0,
        statusText: error.name === 'AbortError' ? 'Timeout' : 'Error',
        data: null,
        error: message,
        headers: {},
        timing,
      };
    }
  },

  get(url, options = {}, timeout = 10000) {
    return this.request(url, { ...options, method: 'GET' }, timeout);
  },

  post(url, payload = null, options = {}, timeout = 10000) {
    const requestOptions = { ...options, method: 'POST' };
    if (payload !== null) {
      requestOptions.body = typeof payload === 'string' ? payload : JSON.stringify(payload);
      if (typeof payload !== 'string') {
        requestOptions.headers = { 'Content-Type': 'application/json', ...requestOptions.headers };
      }
    }
    return this.request(url, requestOptions, timeout);
  },
};

export default apiClient;
