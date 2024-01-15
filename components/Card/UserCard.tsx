import { UserData } from '@/Type.typing';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

export default function UserCard({ user }: { user: UserData }) {
	return (
		<>
			<div className=''>
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

					{/* Follow */}
					<div className='mx-auto'></div>
					<div>
						<Button variant={'outline'}>Follow</Button>
					</div>
				</Link>
			</div>
		</>
	);
}
