export const onRequest: PagesFunction = async (context) => {
	const response = await context.next();
	const host = new URL(context.request.url).hostname;

	if (
		host === "custodyschedulegenerator.pages.dev" ||
		host.endsWith(".custodyschedulegenerator.pages.dev")
	) {
		const newResponse = new Response(response.body, response);
		newResponse.headers.set("X-Robots-Tag", "noindex, nofollow");
		return newResponse;
	}

	return response;
};
