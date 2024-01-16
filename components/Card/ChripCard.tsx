import { ChripType, UserData } from '@/Type.typing';
import { getCurrentUser } from '@/lib/actions/fetchData';
import { MessageCircle, Repeat, Send } from 'lucide-react';
import Link from 'next/link';
import ChripMoreButton from '../functionalButton/ChripMoreButton';
import LikeButton from '../functionalButton/LikeButton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '../ui/dialog';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '../ui/hover-card';
import UserCard from './UserCard';

export default async function ChripCard({ chrip }: { chrip: ChripType }) {
	const currentUser: UserData = await getCurrentUser();

	return (
		<div className='flex gap-2'>
			{/* Rgiht side */}
			<HoverCard>
				<HoverCardTrigger>
					<Avatar className='w-12 h-12'>
						<AvatarImage src={chrip.user.image} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</HoverCardTrigger>
				<HoverCardContent className='flex gap-2 overflow-hidden'>
					<Avatar>
						<AvatarImage src={chrip.user.image} alt='user' />
					</Avatar>
					<div className='text-sm'>
						<p>{chrip.user.name}</p>
						<div className='flex gap-2 text-muted-foreground'>
							<p>{chrip.user.Chrips.length} Chrip</p>
							<p>|</p>
							<p className=''>{chrip.user.Chrips.length} Followers</p>
						</div>
						<div className='mt-2 flex gap-2'>
							<Button variant='outline' size='sm' asChild>
								<Link href={`/user/${chrip.user.username}`}>Profile</Link>
							</Button>
							{currentUser.username != chrip.user.username && (
								<Button variant='outline' size='sm'>
									Follow
								</Button>
							)}
						</div>
					</div>
				</HoverCardContent>
			</HoverCard>

			{/* Content */}
			<div className='text-sm'>
				<Link href={`/user/${chrip.user.username}`}>
					<p className='font-semibold ml-2'>{chrip.user.name}</p>
				</Link>
				<Link href={`post/${chrip._id}`}>
					<p className='text-base ml-2'>{chrip.text}</p>
				</Link>

				{/* Button */}
				<div className='flex'>
					{currentUser && <LikeButton chrip={chrip} user={currentUser} />}
					<Link href={`post/${chrip._id}`}>
						<Button
							size='icon'
							variant='ghost'
							className='rounded-full scale-100 hover:scale-95 transition-all'
						>
							<MessageCircle />
						</Button>
					</Link>
					<Link href='/'>
						<Button
							size='icon'
							variant='ghost'
							className='rounded-full scale-100 hover:scale-95 transition-all'
						>
							<Repeat />
						</Button>
					</Link>
					<Button
						size='icon'
						variant='ghost'
						className='rounded-full scale-100 hover:scale-95 transition-all'
					>
						<Send />
					</Button>
				</div>

				{/* Likes and repliess */}
				<div className='flex gap-4 ml-2'>
					<Dialog>
						<DialogTrigger className='text-sm text-foreground/50'>
							{chrip.likes.length} Likes
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>Likes:</DialogHeader>
							<div>
								{chrip.likes.map((like) => (
									<div key={like._id}>
										<UserCard user={like} />
									</div>
								))}
							</div>
						</DialogContent>
					</Dialog>

					<p className='text-sm text-foreground/50'>20 Replies</p>
				</div>
			</div>

			<div className='mx-auto'></div>
			{/* Left side */}
			<ChripMoreButton chrip={chrip} />
		</div>
	);
}
