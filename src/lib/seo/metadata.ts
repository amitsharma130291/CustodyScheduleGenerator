const defaultSiteUrl = 'https://custodybuilder.com';

export function getCanonicalUrl(pathname: string, siteUrl = defaultSiteUrl) {
	const url = new URL(pathname, siteUrl);
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
