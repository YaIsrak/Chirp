import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { baseUrl } from '@/app/sitemap';
import { Session, getServerSession } from 'next-auth';

export async function getCurrentUser() {
	const session: Session | null = await getServerSession(authOptions);

	const res = await fetch(
		`${baseUrl}/api/users/${session?.user?.email as string}`
	);

	if (!res.ok) {
		throw new Error('Failed to fetch current user!');
	}
	const currentUser = res.json();
	return currentUser;
}
