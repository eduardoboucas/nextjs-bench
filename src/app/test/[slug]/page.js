export const revalidate = 3600;
export const dynamicParams = true;

export default async function Page({ params }) {
  const { slug } = await params;

  return (
    <ul>
      <li>Slug: {slug}</li>
      <li>Date: {Date.now()}</li>
    </ul>
  );
}
