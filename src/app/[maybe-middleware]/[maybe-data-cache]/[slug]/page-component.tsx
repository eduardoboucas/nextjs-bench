import { unstable_cache } from "next/cache";

const allowedMiddlewareParams = ["with-middleware", "no-middleware"] as const;
const allowedDataCacheParams = [
  "no-data-cache",
  "single-data-cache-use",
] as const;

type PageParams = {
  "maybe-middleware": (typeof allowedMiddlewareParams)[number];
  "maybe-data-cache": (typeof allowedDataCacheParams)[number];
  slug: string;
};

type PageParamsInput = {
  "maybe-middleware": PageParams["maybe-middleware"] | string;
  "maybe-data-cache": PageParams["maybe-data-cache"] | string;
  slug: string;
};

function getPageParamsErrors(params: PageParamsInput): string[] {
  const middlewareParamsOk = (
    allowedMiddlewareParams as unknown as string[]
  ).includes(params["maybe-middleware"]);
  const dataCacheParamsOk = (
    allowedDataCacheParams as unknown as string[]
  ).includes(params["maybe-data-cache"]);

  const validationErrors = [];

  if (!middlewareParamsOk) {
    validationErrors.push(
      `middleware param must be one of: ${allowedMiddlewareParams.join(
        ", "
      )} (was "${params["maybe-middleware"]}")`
    );
  }

  if (!dataCacheParamsOk) {
    validationErrors.push(
      `data-cache param must be one of: ${allowedDataCacheParams.join(
        ", "
      )} (was "${params["maybe-data-cache"]}")`
    );
  }

  return validationErrors;
}

function isExpectedPageParams(params: PageParamsInput): params is PageParams {
  return getPageParamsErrors(params).length === 0;
}

const cachedFakeAPI = unstable_cache(async () => {
  console.log("running fake api");
  const time = new Date().toISOString();
  // simulate a slow API call
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return time;
}, ["data-cache"]);

export function getPageComponent({
  dynamic,
  revalidate,
  finalSlug,
}: {
  dynamic: "force-dynamic" | "force-static";
  revalidate?: number;
  finalSlug: string;
}) {
  return async function Page({
    params: paramsPromise,
  }: {
    params: Promise<PageParamsInput>;
  }) {
    const params = await paramsPromise;

    if (!isExpectedPageParams(params)) {
      const errors = getPageParamsErrors(params);

      return (
        <>
          <h1>Unexpected url params</h1>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </>
      );
    }

    console.log("rendering html");

    const pageDescription = {
      time: new Date().toISOString(),
      dynamic,
      revalidate,
      finalSlug,
      params,
      runsMiddleware: params["maybe-middleware"] === "with-middleware",
      usesDataCache: params["maybe-data-cache"] === "single-data-cache-use",
      dataCacheUse: [] as { id: string; result: string }[],
    };

    if (pageDescription.usesDataCache) {
      console.log("using unstable_cache");
      const result = await cachedFakeAPI();
      pageDescription.dataCacheUse.push({ id: "data-cache", result });
    }

    return <pre>{JSON.stringify(pageDescription, null, 2)}</pre>;
  };
}
