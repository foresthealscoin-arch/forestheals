import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://forestheals.in';

  return [
    {
      url: base,
      lastModified: new Date(),
    },
    {
      url: `${base}/shop`,
      lastModified: new Date(),
    },
    {
      url: `${base}/best-sellers`,
      lastModified: new Date(),
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
    },
    {
      url: `${base}/quiz`,
      lastModified: new Date(),
    },
  ];
}
