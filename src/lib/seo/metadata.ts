const defaultSiteUrl = 'https://custodybuilder.com/';

export function normalizeTrailingSlash(pathname: string) {
	if (pathname === '/') return pathname;
	const trimmedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
	const lastSegment = trimmedPathname.split('/').pop() ?? '';
	if (lastSegment.includes('.')) return trimmedPathname;
	return `${trimmedPathname}/`;
}

export function getCanonicalUrl(pathname: string, siteUrl = defaultSiteUrl) {
	const url = new URL(pathname, siteUrl);
	url.pathname = normalizeTrailingSlash(url.pathname);
	url.search = '';
	url.hash = '';
	return url.toString();
}

export function buildTitle(title: string) {
	return title.includes('CustodyBuilder') ? title : `${title} | CustodyBuilder`;
}

export function truncateDescription(description: string) {
	return description.length > 158 ? `${description.slice(0, 155).trim()}...` : description;
}
