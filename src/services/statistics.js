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
  const state = snapshot[apiId] || {
    totalRequests: 0,
    successfulResponses: 0,
    httpFailures: 0,
    networkFailures: 0,
    averageResponseTime: 0,
    lastRequestTime: null,
  };
  return { ...state };
}

export function updateApiStats(apiId, result) {
  const snapshot = getStatsSnapshot();
  const current = snapshot[apiId] || {
    totalRequests: 0,
    successfulResponses: 0,
    httpFailures: 0,
    networkFailures: 0,
    averageResponseTime: 0,
    lastRequestTime: null,
  };

  const next = {
    ...current,
    totalRequests: (current.totalRequests || 0) + 1,
    lastRequestTime: new Date().toISOString(),
    averageResponseTime: current.totalRequests
      ? ((current.averageResponseTime * current.totalRequests) + Number(result.timeMs || 0)) / (current.totalRequests + 1)
      : Number(result.timeMs || 0),
  };

  if (result.ok) {
    next.successfulResponses = (current.successfulResponses || 0) + 1;
  } else if ((result.status || 0) >= 400) {
    next.httpFailures = (current.httpFailures || 0) + 1;
  } else {
    next.networkFailures = (current.networkFailures || 0) + 1;
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
  const values = Object.values(snapshot);

  const totalRequests = values.reduce((sum, item) => sum + (item.totalRequests || 0), 0);
  const successful = values.reduce((sum, item) => sum + (item.successfulResponses || 0), 0);
  const httpFailures = values.reduce((sum, item) => sum + (item.httpFailures || 0), 0);
  const networkFailures = values.reduce((sum, item) => sum + (item.networkFailures || 0), 0);
  const averageResponseTime = values.length
    ? values.reduce((sum, item) => sum + (item.averageResponseTime || 0), 0) / values.length
    : 0;

  return {
    totalRequests,
    successful,
    httpFailures,
    networkFailures,
    averageResponseTime,
  };
}
