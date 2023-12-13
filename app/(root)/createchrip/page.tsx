import { SessionType, UserData } from '@/Type.typing';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ChripForm from '@/components/Form/ChripForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchUserByEmail } from '@/lib/actions/user.action';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
	title: 'Search',
};

export default async function page() {
	const session: SessionType | null = await getServerSession(authOptions);
	const userInfo: UserData = await fetchUserByEmail(session?.user.email || '');

	if (!session) return null;

	return (
		<section className='w-full h-screen flex justify-center align-middle items-center bg-foreground/10 '>
			<div className='space-y-2 '>
				<p className='text-center text-sm font-bold'>New Chrip</p>
				{/* Card */}
				<div className='p-5 bg-background rounded-lg space-y-3 w-[450px]'>
					<div className='flex items-center gap-2'>
						<Avatar className='w-6 h-6'>
							<AvatarImage src={userInfo.image} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<p className='text-sm font-bold'>{userInfo.username}</p>
					</div>

					{/* Form */}
					<ChripForm userInfo={userInfo} />
				</div>
			</div>
		</section>
	);
}
