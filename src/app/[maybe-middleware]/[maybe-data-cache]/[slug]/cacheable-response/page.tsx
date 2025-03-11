import { getPageComponent } from "../page-component";

export const revalidate = 3600;
export const dynamic = "force-static";

export const dynamicParams = true;
export const generateStaticParams = async () => [];

export default getPageComponent({
  dynamic,
  revalidate,
  finalSlug: "cacheable-response",
});
