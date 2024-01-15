import { UserData } from '@/Type.typing';
import { baseUrl } from '@/app/sitemap';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function useCurrentUserByEmail() {
	const { data: session } = useSession();
	const [currentUser, setCurrentUser] = useState<UserData>();

	useEffect(() => {
		async function fetchData() {
			await fetch(`${baseUrl}/api/users/${session?.user?.email}`)
				.then((res) => res.json())
				.then((data) => setCurrentUser(data));
		}

		fetchData();
	}, []);

	return { session, currentUser };
}
