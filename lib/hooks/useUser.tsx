import { UserData } from '@/Type.typing';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { baseUrl } from '../utils';

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
	}, [session]);

	return { session, currentUser };
}

export function useFetchUserByUsername(username: string) {
	const [userInfo, setUserInfo] = useState<UserData>();

	useEffect(() => {
		async function fetchData() {
			await fetch(`${baseUrl}/api/users/username/${username}`)
				.then((res) => res.json())
				.then((data) => setUserInfo(data));
		}
		fetchData();
	}, []);
	return userInfo;
}
