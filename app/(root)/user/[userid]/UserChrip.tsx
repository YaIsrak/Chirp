import { ChripType, UserData } from '@/Type.typing';
import UserCard from '@/components/Card/UserCard';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog';
import { fetchUser } from '@/lib/actions/user.action';
import Image from 'next/image';
import Link from 'next/link';

export default async function UserChrip({ username }: { username: string }) {
	const userinfo: UserData = await fetchUser(username, true);
	return (
		<div className='space-y-6 mt-6'>
			{userinfo.Chrips.length > 0 ? (
				userinfo.Chrips.map((chrip) => (
					<UserChripCard key={chrip._id} chrip={chrip} />
				))
			) : (
				<div className='flex flex-col items-center justify-center py-12'>
					<Image
						src='/empty.png'
						className='dark:hidden'
						alt=''
						height={200}
						width={200}
					/>
					<Image
						src='/empty-dark.png'
						className='hidden dark:block'
						alt=''
						height={200}
						width={200}
					/>
					<p className='font-medium'>Opps! You haven&apos;t created no chrip</p>
				</div>
			)}
		</div>
	);
}

export function UserChripCard({ chrip }: { chrip: ChripType }) {
	return (
		<>
			<div key={chrip._id} className='flex gap-2'>
				<Avatar>
					<AvatarImage alt='user' src={chrip.user.image} />
				</Avatar>

				<div className='text-sm'>
					<Link href={`/user/${chrip.user.username}`}>
						<p className='font-semibold ml-2'>{chrip.user.name}</p>
					</Link>
					<Link href={`post/${chrip._id}`}>
						<p className='text-base ml-2'>{chrip.text}</p>
					</Link>

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
			</div>
			<hr />
		</>
	);
}
