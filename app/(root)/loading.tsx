import ChripSkeleton from '@/components/Skeleton/ChripSkeleton';

export default function loading() {
	return (
		<section className='section container-lg'>
			<div className='space-y-6'>
				<ChripSkeleton />
				<hr />
				<ChripSkeleton />
				<hr />
				<ChripSkeleton />
				<hr />
				<ChripSkeleton />
				<hr />
				<ChripSkeleton />
				<hr />
			</div>
		</section>
	);
}
