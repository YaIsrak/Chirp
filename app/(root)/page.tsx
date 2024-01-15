import { ChripType } from '@/Type.typing';
import ChripCard from '@/components/Card/ChripCard';
import Empty from '@/components/Empty';
import { fetchAllChrip } from '@/lib/actions/chrip.action';

export default async function Home() {
	const { data } = await fetchAllChrip();
	const ChripData: ChripType[] = JSON.parse(JSON.stringify(data));

	if (ChripData.length === 0) return <Empty />;

	return (
		<section className='section'>
			<div className='container-lg'>
				<div className='space-y-6'>
					{ChripData.map((chrip: ChripType) => (
						<>
							<ChripCard key={chrip._id} chrip={chrip} />
							<hr />
						</>
					))}
				</div>
			</div>
		</section>
	);
}
