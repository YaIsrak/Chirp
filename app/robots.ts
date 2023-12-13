import { MetadataRoute } from 'next';

const baseUrl = process.env.baseURL
	? `https://${process.env.baseURL}`
	: 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: '/private/',
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	};
}
