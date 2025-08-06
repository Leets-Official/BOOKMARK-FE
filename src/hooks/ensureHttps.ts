function ensureHttps(url: string): string {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
}

export default ensureHttps;
