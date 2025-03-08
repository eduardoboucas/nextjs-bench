export const revalidate = 3600; // Cache for 1 hour

export default async function Page({ params }) {
  const { slug } = await params;

  const res = await fetch("https://example.com", {
    next: { revalidate: 3600 }
  });
  await res.text();

  return (
    <ul>
      <li>Slug: {slug}</li>
      <li>Date: {res.headers.get("date")}</li>
    </ul>
  );
}
