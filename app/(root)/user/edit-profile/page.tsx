import { SessionType, UserData } from '@/Type.typing';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AccoutEditForm from '@/components/Form/AccoutEditForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCurrentUser } from '@/lib/actions/fetchData';
import { Metadata } from 'next';

import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
	title: 'Edit Profile',
};

export default async function page() {
	const session: SessionType | null = await getServerSession(authOptions);
	const currentUser: UserData = await getCurrentUser();

	return (
		<section className='section'>
			<div className='container-lg'>
				<Avatar className='w-20 h-20 cursor-pointer'>
					<AvatarImage src={session?.user.image} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<h1></h1>
				<p className='text-foreground/50 my-3'>Login with {session?.user?.email}</p>

				<AccoutEditForm currentUser={currentUser} />
			</div>
		</section>
	);
}
