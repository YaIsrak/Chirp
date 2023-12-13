import { ChripType } from '@/Type.typing';
import ChripCard from '@/components/Card/ChripCard';
import { fetchAllChrip } from '@/lib/actions/chrip.action';

export default async function Home() {
	const data = await fetchAllChrip();
	const ChripData = JSON.parse(JSON.stringify(data));

	if (!ChripData) {
		return null;
	}

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
