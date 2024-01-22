import { ChripType } from '@/Type.typing';
import ChripCard from '@/components/Card/ChripCard';
import CommentForm from '@/components/Form/CommentForm';
import { fetchSingleChrip } from '@/lib/actions/chrip.action';

export async function generateMetadata({
	params,
}: {
	params: { post: string };
}) {
	const data: ChripType = await fetchSingleChrip(params.post);
	return {
		title: data.text,
		description: `${data.user} ${data.text}`,
	};
}

export default async function page({ params }: { params: { post: string } }) {
	const data = await fetchSingleChrip(params.post);
	const chripData: ChripType = JSON.parse(JSON.stringify(data));

	return (
		<section className='section container-lg'>
			<ChripCard chrip={chripData} />
			<br />
			<hr />

			{/* Form */}
			<div className='py-4'>
				<CommentForm chrip={chripData} />
			</div>

			{chripData.children.length != 0 && <h3>Replies:</h3>}
			<div className=''>
				{chripData.children.length > 0
					? chripData.children.map((chrip: ChripType) => (
							<ChripCard key={chrip._id} chrip={chrip} />
					  ))
					: null}
			</div>
		</section>
	);
}
