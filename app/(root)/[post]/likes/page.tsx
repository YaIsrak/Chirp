import { ChripType, UserData } from '@/Type.typing';
import UserCard from '@/components/Card/UserCard';
import { fetchSingleChrip } from '@/lib/actions/chrip.action';

export async function generateMetadata({
	params,
}: {
	params: { post: string };
}) {
	const data: ChripType = await fetchSingleChrip(params.post);
	return {
		title: `Like of  ${data.text}`,
		description: `${data.user} ${data.text}`,
	};
}

export default async function page({ params }: { params: { post: string } }) {
	const data = await fetchSingleChrip(params.post);
	const chrip: ChripType = JSON.parse(JSON.stringify(data));

	return (
		<section className='section'>
			<div className='container-lg'>
				{chrip.likes.map((like: UserData) => (
					<div key={like._id} className='space-y-4'>
						<UserCard user={like} />
					</div>
				))}
			</div>
		</section>
	);
}
