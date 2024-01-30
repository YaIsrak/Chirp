import { ChripType, UserData } from '@/Type.typing';
import { fetchAllChrip } from '@/lib/actions/chrip.action';
import { fetchAllUser } from '@/lib/actions/user.action';
import { NavItem } from '@/lib/constantData';
import { baseUrl } from '@/lib/utils';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const UserData: UserData[] = await fetchAllUser();
	const { data } = await fetchAllChrip();

	const routemap = NavItem.map((item) => ({
		url: `${baseUrl}${item.path}`,
		lastModified: new Date().toISOString(),
	}));

	const userMap = UserData.map((userData: UserData) => ({
		url: `${baseUrl}/user/${userData.username}`,
		lastModified: new Date().toISOString(),
	}));

	const chriprMap = data.map((chrip: ChripType) => ({
		url: `${baseUrl}/${chrip._id}`,
		lastModified: new Date().toISOString(),
	}));

	return [...routemap, ...userMap, ...chriprMap];
}
