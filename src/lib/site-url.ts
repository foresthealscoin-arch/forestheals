export function getSiteUrl() {
  return (
    process.env.URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000'
  ).replace(/\/$/, '');
}
