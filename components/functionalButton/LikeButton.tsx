'use client';
import { ChripType, UserData } from '@/Type.typing';
import { LikeCrip, RemoveLike } from '@/lib/actions/chrip.action';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

export default function LikeButton({
	chrip,
	user,
}: {
	chrip: ChripType;
	user: UserData;
}) {
	chrip.likes.some((like) => like._id === user._id);
	const [liked, setLiked] = useState(
		chrip.likes.some((like) => like._id === user._id)
	);
	const route = useRouter();

	async function handleLike() {
		!liked
			? await LikeCrip(chrip._id, user._id)
					.then(() => {
						route.refresh();
					})
					.catch((error) => {
						toast({
							title: 'There is an error!',
							description: error.message,
							variant: 'destructive',
						});
					})
			: await RemoveLike(chrip._id, user._id)
					.then(() => {
						route.refresh();
					})
					.catch((error) => {
						toast({
							title: 'There is an error!',
							description: error.message,
							variant: 'destructive',
						});
					});

		liked ? setLiked(false) : setLiked(true);
	}

	return (
		<Button
			size='icon'
			variant='ghost'
			className={cn(
				'rounded-full scale-100 hover:scale-95 transition-all',
				liked && 'text-red-500  hover:text-red-500'
			)}
			onClick={() => {
				handleLike();
			}}
		>
			<Heart />
		</Button>
	);
}
