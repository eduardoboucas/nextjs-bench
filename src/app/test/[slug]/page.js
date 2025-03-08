export const revalidate = 3600; // Cache for 1 hour

export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <ul>
      <li>Slug: {slug}</li>
      <li>Generation timestamp: {Date.now()}</li>
    </ul>
  );
}
