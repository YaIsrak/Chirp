import { UserData } from '@/Type.typing';
import ChripForm from '@/components/Form/ChripForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCurrentUser } from '@/lib/actions/fetchData';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create Chrip',
};

export default async function page() {
	const currentUser: UserData = await getCurrentUser();
	if (!currentUser) return null;

	return (
		<section className='w-full h-screen flex justify-center align-middle items-center bg-foreground/10 '>
			<div className='space-y-2 '>
				<p className='text-center text-sm font-bold'>New Chrip</p>
				{/* Card */}
				<div className='p-5 bg-background rounded-lg space-y-3 w-full sm:w-[450px]'>
					<div className='flex items-center gap-2'>
						<Avatar className='w-6 h-6'>
							<AvatarImage src={currentUser.image} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<p className='text-sm font-bold'>{currentUser.username}</p>
					</div>

					{/* Form */}
					<ChripForm userInfo={currentUser} />
				</div>
			</div>
		</section>
	);
}
