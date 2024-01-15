'use client';

import { DeleteChrip } from '@/lib/actions/chrip.action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ChripDeleteButton({ postid }: { postid: string }) {
	const route = useRouter();

	async function handleDelete(postid: string) {
		await DeleteChrip(postid)
			.then(() => {
				route.refresh();
				toast.success('Successfully deleted');
			})
			.catch((error) => {
				toast.error(`There is an error: ${error.message}`);
			});
	}

	return <button onClick={() => handleDelete(postid)}>Delete</button>;
}
