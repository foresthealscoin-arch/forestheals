import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

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
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
    },
  ];
}
