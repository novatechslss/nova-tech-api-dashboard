export function assessHealth(apiResult) {
  if (!apiResult) {
    return { status: 'unknown', label: 'Unknown', tone: 'status-unknown' };
  }

  if (apiResult.status === 0) {
    if (apiResult.error && /CORS|blocked|network/i.test(apiResult.error)) {
      return { status: 'blocked', label: 'Blocked', tone: 'status-blocked' };
    }
    return { status: 'unknown', label: 'Unknown', tone: 'status-unknown' };
  }

  if (apiResult.status >= 200 && apiResult.status < 300) {
    return { status: 'online', label: 'Online', tone: 'status-online' };
  }

  if (apiResult.status >= 400 && apiResult.status < 500) {
    return { status: 'error', label: 'Error', tone: 'status-error' };
  }

  if (apiResult.status >= 500) {
    return { status: 'error', label: 'Error', tone: 'status-error' };
  }

  return { status: 'unknown', label: 'Unknown', tone: 'status-unknown' };
}
