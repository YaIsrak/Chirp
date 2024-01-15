import { baseUrl } from '@/app/sitemap';
import { useEffect, useState } from 'react';

export function useChrips() {
	const [chrips, setChrips] = useState([]);

	useEffect(() => {
		async function fetchData() {
			await fetch(`${baseUrl}/api/post`)
				.then((res) => res.json())
				.then((data) => setChrips(data));
		}

		fetchData();
	}, []);

	return chrips;
}
