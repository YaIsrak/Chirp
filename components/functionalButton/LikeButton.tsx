'use client';
import { ChripType, UserData } from '@/Type.typing';
import { LikeCrip, RemoveLike } from '@/lib/actions/chrip.action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoHeart } from 'react-icons/io5';
import { toast } from 'sonner';
import { Button } from '../ui/button';

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
						toast.error(`There is an error: ${error.message}`);
					})
			: await RemoveLike(chrip._id, user._id)
					.then(() => {
						route.refresh();
					})
					.catch((error) => {
						toast.error(`There is an error: ${error.message}`);
					});

		liked ? setLiked(false) : setLiked(true);
	}

	return (
		<Button
			size={'sm'}
			variant={'secondary'}
			className='w-full gap-2 rounded-xl scale-100 hover:scale-95 transition-all bg-background'
			onClick={() => {
				handleLike();
			}}
		>
			<div className='flex gap-2 items-center'>
				{liked ? (
					<IoHeart className='h-4 w-4 text-rose-500' />
				) : (
					<IoMdHeartEmpty className='h-4 w-4' />
				)}
				<span className='hidden md:block text-xs'>Like</span>
			</div>
		</Button>
	);
}
