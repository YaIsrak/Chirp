'use client';

import { DeleteChrip } from '@/lib/actions/chrip.action';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';

export default function ChripDeleteButton({ postid }: { postid: string }) {
	const route = useRouter();

	async function handleDelete(postid: string) {
		await DeleteChrip(postid)
			.then(() => {
				toast({
					title: 'Successfully deleted',
					description: `Post id: ${postid}`,
				});
				route.refresh();
			})
			.catch((error) => {
				toast({
					title: 'There is an error',
					description: `${error.message}`,
					variant: 'destructive',
				});
			});
	}

	return <button onClick={() => handleDelete(postid)}>Delete</button>;
}
