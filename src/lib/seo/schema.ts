interface FAQItem {
	question: string;
	answer: string;
}

interface BreadcrumbItem {
	name: string;
	url: string;
}

export function buildFAQSchema(items: FAQItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		inLanguage: 'en-US',
		mainEntity: items.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	};
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
	items.forEach((item) => {
		if (!item.url || !/^https?:\/\//.test(item.url)) {
			throw new Error(`Breadcrumb item "${item.name}" must include an absolute item URL.`);
		}
	});

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		inLanguage: 'en-US',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

export function buildWebPageSchema({
	name,
	description,
	url,
}: {
	name: string;
	description: string;
	url: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name,
		description,
		url,
		inLanguage: 'en-US',
	};
}

export function buildAboutPageSchema({
	name,
	description,
	url,
}: {
	name: string;
	description: string;
	url: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'AboutPage',
		name,
		description,
		url,
		inLanguage: 'en-US',
	};
}

export function buildWebSiteSchema({
	name,
	url,
	description,
}: {
	name: string;
	url: string;
	description: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name,
		url,
		description,
		inLanguage: 'en-US',
	};
}

export function buildBlogSchema({
	name,
	url,
	description,
}: {
	name: string;
	url: string;
	description: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		name,
		url,
		description,
		inLanguage: 'en-US',
	};
}

export function buildOrganizationSchema({
	name,
	url,
}: {
	name: string;
	url: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name,
		url,
		areaServed: 'US',
	};
}

export function buildSoftwareApplicationSchema({
	name,
	description,
	url,
	applicationCategory = 'UtilitiesApplication',
}: {
	name: string;
	description: string;
	url: string;
	applicationCategory?: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name,
		description,
		url,
		inLanguage: 'en-US',
		areaServed: 'US',
		applicationCategory,
		operatingSystem: 'Web',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
	};
}
