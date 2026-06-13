export function removeTrailingSlash(url: string): string {
	if (!url) return url;

	try {
		const parsed = new URL(url);

		if (parsed.pathname !== '/') {
			parsed.pathname = parsed.pathname.replace(/\/+$/, '');
		}

		return parsed.toString();
	} catch {
		if (url === '/') return '/';
		return url.replace(/\/+$/, '');
	}
}

export function buildCanonicalUrl(site: string, pathname: string): string {
	const base = site.endsWith('/') ? site : `${site}/`;
	const url = new URL(pathname, base).toString();
	return removeTrailingSlash(url);
}
