// =============================================================
// PASSGENI — ROBOTS.TXT
// =============================================================

export default function Robots() {
  return null;
}

export async function getServerSideProps({ res }) {
  const content = `User-agent: *
Allow: /

Sitemap: https://passgeni.ai/sitemap.xml`;

  res.setHeader("Content-Type", "text/plain");
  res.write(content);
  res.end();

  return { props: {} };
}
