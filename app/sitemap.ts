import { ChripType, UserData } from '@/Type.typing';
import { fetchAllChrip } from '@/lib/actions/chrip.action';
import { fetchAllUser } from '@/lib/actions/user.action';
import { NavItem } from '@/lib/constantData';
import { MetadataRoute } from 'next';

const baseUrl = process.env.baseURL
	? `https://${process.env.baseURL}`
	: 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const UserData: UserData[] = await fetchAllUser();
	const AllChrip: ChripType[] = await fetchAllChrip();

	const routemap = NavItem.map((item) => ({
		url: `${baseUrl}${item.path}`,
		lastModified: new Date().toISOString(),
	}));

	const userMap = UserData.map((userData: UserData) => ({
		url: `${baseUrl}/user/${userData.username}`,
		lastModified: new Date().toISOString(),
	}));

	const chriprMap = AllChrip.map((chrip: ChripType) => ({
		url: `${baseUrl}/${chrip._id}`,
		lastModified: new Date().toISOString(),
	}));

	return [...routemap, ...userMap, ...chriprMap];
}
