const STORAGE_KEY = 'nova-tech-api-statistics';

export function getStatistics() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function recordRequest(apiName, success, duration, statusCode) {
  const stats = getStatistics();
  const existing = stats[apiName] || { count: 0, success: 0, failed: 0, duration: 0, lastStatus: 'unknown' };

  existing.count += 1;
  existing.success += success ? 1 : 0;
  existing.failed += success ? 0 : 1;
  existing.duration = Math.round(((existing.duration * (existing.count - 1)) + (duration || 0)) / existing.count);
  existing.lastStatus = statusCode || existing.lastStatus;
  existing.lastUpdated = new Date().toISOString();

  stats[apiName] = existing;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  return stats[apiName];
}

export function resetStatistics() {
  localStorage.removeItem(STORAGE_KEY);
  return {};
}
