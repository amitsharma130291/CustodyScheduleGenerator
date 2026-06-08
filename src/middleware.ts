import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  const host = new URL(context.request.url).hostname;

  if (
    host === "custodyschedulegenerator.pages.dev" ||
    host.endsWith(".custodyschedulegenerator.pages.dev")
  ) {
    response.headers.set(
      "X-Robots-Tag",
      "noindex, nofollow"
    );
  }

  return response;
});