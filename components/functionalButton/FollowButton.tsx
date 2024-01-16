'use client';
import { FollowUser, UnfollowUser } from '@/lib/actions/user.action';
import {
	useCurrentUserByEmail,
	useFetchUserByUsername,
} from '@/lib/hooks/useUser';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '../ui/button';

interface FollowButtonProps {
	isPage?: boolean;
	userid: string;
}

export default function FollowButton({ isPage, userid }: FollowButtonProps) {
	const route = useRouter();
	const { currentUser } = useCurrentUserByEmail();
	const user = useFetchUserByUsername(userid);
	let isFollowed = user?.followers.some(
		(follower) => follower._id === currentUser?._id
	);

	async function handleFollow() {
		!isFollowed
			? await FollowUser(user?._id as string, currentUser?._id as string)
					.then(() => {
						route.refresh();
						toast.success(`You are following ${user?.name}`);
						isFollowed = true;
					})
					.catch((error) => {
						toast.error(`There is an error: ${error.message}`);
					})
			: await UnfollowUser(user?._id as string, currentUser?._id as string)
					.then(() => {
						route.refresh();
						toast.success(`You are unfollowing ${user?.name}`);
						isFollowed = false;
					})
					.catch((error) => {
						toast.error(`There is an error: ${error.message}`);
					});
	}

	if (!user)
		return (
			<Button disabled className='w-full'>
				Loading
			</Button>
		);

	return (
		<Button
			className='w-full'
			variant={isPage ? 'default' : 'outline'}
			size={isPage ? 'default' : 'sm'}
			onClick={handleFollow}
		>
			{isFollowed ? 'Unfollow' : 'Follow'}
		</Button>
	);
}
