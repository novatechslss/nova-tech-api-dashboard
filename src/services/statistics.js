const STORAGE_KEY = 'nova-tech-api-stats-v1';

export function getStatsSnapshot() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getApiStats(apiId) {
  const snapshot = getStatsSnapshot();
  const existing = snapshot[apiId] || {
    totalRequests: 0,
    successfulResponses: 0,
    httpFailures: 0,
    networkFailures: 0,
    lastRequestTime: null,
    averageResponseTime: 0,
  };
  return { ...existing };
}

export function updateApiStats(apiId, result) {
  const snapshot = getStatsSnapshot();
  const current = snapshot[apiId] || {
    totalRequests: 0,
    successfulResponses: 0,
    httpFailures: 0,
    networkFailures: 0,
    lastRequestTime: null,
    averageResponseTime: 0,
  };

  const timeMs = Number(result.timeMs || 0);
  const next = {
    ...current,
    totalRequests: (current.totalRequests || 0) + 1,
    lastRequestTime: new Date().toISOString(),
    averageResponseTime: current.totalRequests
      ? ((current.averageResponseTime * current.totalRequests) + timeMs) / (current.totalRequests + 1)
      : timeMs,
  };

  if (result.ok) {
    next.successfulResponses = (next.successfulResponses || 0) + 1;
  } else if (result.status >= 400) {
    next.httpFailures = (next.httpFailures || 0) + 1;
  } else {
    next.networkFailures = (next.networkFailures || 0) + 1;
  }

  snapshot[apiId] = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  return next;
}

export function resetApiStats(apiId) {
  const snapshot = getStatsSnapshot();
  delete snapshot[apiId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export function resetAllStats() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
}

export function getSessionSummary() {
  const snapshot = getStatsSnapshot();
  const all = Object.values(snapshot);
  const totalRequests = all.reduce((sum, item) => sum + (item.totalRequests || 0), 0);
  const successful = all.reduce((sum, item) => sum + (item.successfulResponses || 0), 0);
  const httpFailures = all.reduce((sum, item) => sum + (item.httpFailures || 0), 0);
  const networkFailures = all.reduce((sum, item) => sum + (item.networkFailures || 0), 0);
  const avg = all.length
    ? all.reduce((sum, item) => sum + (item.averageResponseTime || 0), 0) / all.length
    : 0;

  return {
    totalRequests,
    successful,
    httpFailures,
    networkFailures,
    averageResponseTime: avg,
  };
}
