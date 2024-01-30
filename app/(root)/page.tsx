import { ChripType } from '@/Type.typing';
import ChripCard from '@/components/Card/ChripCard';
import Empty from '@/components/Empty';
import { fetchAllChrip } from '@/lib/actions/chrip.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Home() {
	const { data } = await fetchAllChrip();
	const ChripData: ChripType[] = JSON.parse(JSON.stringify(data));
	const session = await getServerSession(authOptions);
	console.log(session);

	if (ChripData.length === 0) return <Empty />;

	return (
		<section className='section'>
			<div className='container-lg'>
				<div className=''>
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
