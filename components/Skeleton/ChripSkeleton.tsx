import { Skeleton } from '../ui/skeleton';

export default function ChripSkeleton() {
	return (
		<div className='flex gap-2'>
			<Skeleton className='w-12 h-12 rounded-full' />
			<div className='space-y-2'>
				<Skeleton className='h-4 w-[200px]' />
				<Skeleton className='h-4 w-[300px]' />
				<div className='flex gap-4'>
					<Skeleton className='h-3 w-20' />
					<Skeleton className='h-3 w-20' />
				</div>
			</div>
		</div>
	);
}
