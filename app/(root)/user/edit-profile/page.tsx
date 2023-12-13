import { SessionType } from '@/Type.typing';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AccoutEditForm from '@/components/Form/AccoutEditForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchUserByEmail } from '@/lib/actions/user.action';
import { Metadata } from 'next';

import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
	title: 'Edit Profile',
};

export default async function page() {
	const session: SessionType | null = await getServerSession(authOptions);
	const userInfo = await fetchUserByEmail(session?.user.email || '');

	return (
		<section className='section'>
			<div className='container-lg'>
				<Avatar className='w-20 h-20 cursor-pointer'>
					<AvatarImage src={session?.user.image} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<h1></h1>
				<p className='text-foreground/50 my-3'>Login with {session?.user?.email}</p>

				<AccoutEditForm session={session} userInfo={userInfo} />
			</div>
		</section>
	);
}
