export const getDisplayableImageUrl = (rawUrl?: string) => {
  if (!rawUrl) {
    return undefined;
  }

  const url = rawUrl.trim();
  if (!url) {
    return undefined;
  }

  const ensureMediaPath = (path: string) => {
    if (path.startsWith('/media/')) {
      return path;
    }
    return `/media/${path.replace(/^\/+/, '')}`;
  };

  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const parsed = new URL(url);
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
      if (currentOrigin && parsed.origin === currentOrigin) {
        return parsed.href;
      }
      if (parsed.pathname.startsWith('/media/')) {
        return `${parsed.pathname}${parsed.search}${parsed.hash}`;
      }
      if (/backend|localhost|127\.0\.0\.1/.test(parsed.hostname)) {
        return ensureMediaPath(parsed.pathname);
      }
      return parsed.href;
    } catch {
      return url;
    }
  }

  if (url.startsWith('/')) {
    return url.startsWith('/media/') ? url : ensureMediaPath(url);
  }

  return ensureMediaPath(url);
};
