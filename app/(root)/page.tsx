import { ChripType } from '@/Type.typing';
import ChripCard from '@/components/Card/ChripCard';
import { Button } from '@/components/ui/button';
import { fetchAllChrip } from '@/lib/actions/chrip.action';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
	const data = await fetchAllChrip();
	const ChripData: ChripType[] = JSON.parse(JSON.stringify(data));

	if (ChripData.length === 0) {
		return (
			<div className='flex flex-col justify-center items-center h-screen space-y-2'>
				<Image src='/empty.png' alt='' height={300} width={300} />
				<h2 className='font-medium'>There&apos; no chrip</h2>
				<Link href={'/createchrip'}>
					<Button>
						<PlusCircle className='w-4 h-4 mr-2' />
						Create Chrip
					</Button>
				</Link>
			</div>
		);
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
