import { ChripType, UserData } from '@/Type.typing';
import { getCurrentUser } from '@/lib/actions/fetchData';
import { MessageCircle, Repeat } from 'lucide-react';
import Link from 'next/link';
import { IoHeart } from 'react-icons/io5';
import { format } from 'timeago.js';
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
import UserCard from './UserCard';

async function ChripCard({ chrip }: { chrip: ChripType }) {
	const currentUser: UserData = await getCurrentUser();

	return (
		<div className='flex gap-2 py-6 bg-foreground/5 p-4 rounded-xl'>
			{/* Rgiht side */}

			<Avatar className='w-12 h-12'>
				<AvatarImage src={chrip.user.image} />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>

			{/* Content */}
			<div className='text-sm flex flex-col gap-2 w-full'>
				<Link
					href={`/user/${chrip.user.username}`}
					className='flex gap-2 items-center'
				>
					<p className='font-semibold text-base ml-2'>{chrip.user.name}</p>
					<p className='text-muted-foreground'>@{chrip.user.username}</p>
				</Link>
				<div className='text-xs text-muted-foreground ml-2'>
					{format(chrip.createdAt)}
				</div>

				<Link href={`post/${chrip._id}`}>
					<p className='text-base ml-2'>{chrip.text}</p>
				</Link>

				{/* Likes and repliess */}
				<div className='flex gap-4 ml-2'>
					<Dialog>
						<DialogTrigger className='text-sm text-muted-foreground flex gap-1 items-center'>
							<IoHeart className='h-4 w-4' />
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

					<p className='text-sm text-muted-foreground flex gap-1 items-center'>
						<Repeat className='w-4 h-4' />
						{chrip.children.length} Replies
					</p>
				</div>

				{/* Button */}
				<div className='flex items-center gap-2'>
					{currentUser && <LikeButton chrip={chrip} user={currentUser} />}
					<Button
						size={'sm'}
						variant={'secondary'}
						className='w-full gap-2 rounded-xl scale-100 hover:scale-95 transition-all bg-background'
						asChild
					>
						<Link href={`post/${chrip._id}`}>
							<MessageCircle className='w-4 h-4' />
							<span className='hidden md:block text-xs'>Comment</span>
						</Link>
					</Button>
					<Button
						size={'sm'}
						variant={'secondary'}
						className='w-full gap-2 rounded-xl scale-100 hover:scale-95 transition-all bg-background'
						asChild
					>
						<Link href='/'>
							<Repeat className='w-4 h-4' />
							<span className='hidden md:block text-xs'>Retweet</span>
						</Link>
					</Button>
				</div>
			</div>

			<div className='mx-auto'></div>
			{/* Left side */}
			<ChripMoreButton chrip={chrip} />
		</div>
	);
}

export default ChripCard;
