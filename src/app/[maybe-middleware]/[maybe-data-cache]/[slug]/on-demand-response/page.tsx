import { getPageComponent } from "../page-component";

export const dynamic = "force-dynamic";

export const dynamicParams = true;
export const generateStaticParams = async () => [];

export default getPageComponent({
  dynamic,
  finalSlug: "on-demand-response",
});
