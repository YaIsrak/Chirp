'use client';
import { UserData } from '@/Type.typing';
import { useCurrentUserByEmail } from '@/lib/hooks/useUser';
import Link from 'next/link';
import FollowButton from '../functionalButton/FollowButton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

export default function UserCard({ user }: { user: UserData }) {
	const { currentUser } = useCurrentUserByEmail();
	return (
		<>
			<div className='flex items-center'>
				<Link
					href={`/user/${user.username}`}
					className='flex items-center gap-3 w-full'
				>
					{/* Avater */}
					<Avatar>
						<AvatarImage src={user.image} />
						<AvatarFallback> CM</AvatarFallback>
					</Avatar>

					{/* Name */}
					<div>
						<p className='text-base font-semibold'>{user.name}</p>
						<p className='text-foreground/50'>{user.username}</p>
					</div>
				</Link>

				{/* Follow */}
				<div className='mx-auto'></div>
				<div>
					{currentUser && currentUser._id != user._id ? (
						<FollowButton isPage userid={user.username} />
					) : (
						<Button asChild>
							<Link href={`/user/${user.username}`}>Profile</Link>
						</Button>
					)}
				</div>
			</div>
		</>
	);
}
