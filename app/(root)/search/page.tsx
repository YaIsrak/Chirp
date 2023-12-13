import { UserData } from '@/Type.typing';
import UserCard from '@/components/Card/UserCard';
import SearchForm from '@/components/Form/SearchForm';
import { fetchAllUser } from '@/lib/actions/user.action';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Search',
};

export default async function Search() {
	const users = await fetchAllUser();

	if (!users) {
		return null;
	}

	return (
		<section className='section'>
			<div className='container-lg'>
				<SearchForm />

				{/* User */}
				<div className='mt-12 space-y-4'>
					{users.map((user: UserData) => (
						<UserCard key={user.id} user={user} />
					))}
				</div>
			</div>
		</section>
	);
}
