const defaultSiteUrl = 'https://custodyschedulegenerator.com';

export function getCanonicalUrl(pathname: string, siteUrl = defaultSiteUrl) {
	return new URL(pathname, siteUrl).toString();
}

export function buildTitle(title: string) {
	return title.includes('Custody Schedule Generator') ? title : `${title} | Custody Schedule Generator`;
}

export function truncateDescription(description: string) {
	return description.length > 158 ? `${description.slice(0, 155).trim()}...` : description;
}
