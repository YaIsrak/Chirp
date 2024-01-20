import { SessionType, UserData } from '@/Type.typing';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserCard from '@/components/Card/UserCard';
import FollowButton from '@/components/functionalButton/FollowButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchAllUser, fetchUser } from '@/lib/actions/user.action';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import UserChrip from './UserChrip';
import UserChripReplay from './UserChripReplay';

export default async function page({ params }: { params: { userid: string } }) {
	const session: SessionType | null = await getServerSession(authOptions);
	const userinfo: UserData = await fetchUser(params.userid);

	if (!userinfo) {
		return null;
	}

	return (
		<section className='section'>
			<div className='container-lg'>
				{/* Info */}
				<div className='profile_info'>
					<div className='info flex justify-between'>
						<div>
							<h2>{userinfo.name}</h2>
							<p className='text-sm'>{userinfo.username}</p>
						</div>
						<Link href={userinfo.image} target='_blank'>
							<Avatar className='w-16 h-16 cursor-pointer'>
								<AvatarImage src={userinfo.image} />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</Link>
					</div>
					<p className='text-sm md:text-base my-5'>{userinfo.bio}</p>
					<div className='flex gap-2'>
						<Dialog>
							<DialogTrigger>
								<p className='text-sm text-foreground/50 underline'>
									{userinfo.followers.length} followers
								</p>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>Followers: </DialogHeader>
								{userinfo.followers.map((follower) => (
									<UserCard key={follower._id} user={follower} />
								))}
							</DialogContent>
						</Dialog>
						<Dialog>
							<DialogTrigger>
								<p className='text-sm text-foreground/50 underline'>
									{userinfo.followers && userinfo.following.length} Following
								</p>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>Followers: </DialogHeader>
								{userinfo.following &&
									userinfo.following.map((follower) => (
										<UserCard key={follower._id} user={follower} />
									))}
							</DialogContent>
						</Dialog>
					</div>
				</div>

				{userinfo.email === session?.user.email ? (
					<div className='my-4 flex justify-center'>
						{/* Edit Button */}
						<Link href={'/user/edit-profile'} className='w-full'>
							<Button className='w-full' variant='outline'>
								Edit Profile
							</Button>
						</Link>
					</div>
				) : (
					<div className='my-4 flex justify-center gap-3'>
						{/* Follow Button */}

						<FollowButton isPage userid={params.userid} />

						<Link href={'/messages/xyz'} className='w-full'>
							<Button className='w-full' variant='outline'>
								Message
							</Button>
						</Link>
					</div>
				)}

				{/* Chrip Tab */}
				<Tabs defaultValue='Chrips' className='mt-5'>
					<TabsList className='w-full grid grid-cols-2'>
						<TabsTrigger value='Chrips'>Chrips</TabsTrigger>
						<TabsTrigger value='Replies'>Replies</TabsTrigger>
					</TabsList>
					<TabsContent value='Chrips'>
						<div className='space-y-6'>
							<UserChrip username={params.userid} />
						</div>
					</TabsContent>
					<TabsContent value='Replies'>
						<UserChripReplay />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}

export async function generateMetadata({
	params,
}: {
	params: { userid: string };
}) {
	const userinfo: UserData = await fetchUser(params.userid);
	return {
		title: userinfo.name,
		description: `${userinfo.bio} ${userinfo.email}`,
	};
}

export async function generateStaticParams() {
	const userData: UserData[] = await fetchAllUser();

	return userData.map((userinfo: UserData) => ({
		userid: userinfo.username,
	}));
}
