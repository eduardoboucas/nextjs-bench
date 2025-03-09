export default async function Page({ params }) {
  const { slug } = await params;

  const res = await fetch(`https://example.com`, {
    next: { tags: [slug] }
  });
  await res.text();

  return (
    <ul>
      <li>Slug: {slug}</li>
      <li>Date: {res.headers.get("date")}</li>
    </ul>
  );
}
