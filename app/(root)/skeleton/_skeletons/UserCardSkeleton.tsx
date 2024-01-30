import { Skeleton } from '@/components/ui/skeleton';

export default function UserCardSkeleton() {
	return (
		<div className='flex items-center'>
			<div className='flex gap-3 w-full'>
				<Skeleton className='h-12 w-12 rounded-full ' />
				<div className='flex flex-col justify-around'>
					<Skeleton className='h-3 w-56' />
					<Skeleton className='h-3 w-24' />
				</div>
			</div>
			<div className='mx-auto'></div>
			<Skeleton className='h-10 w-24 ' />
		</div>
	);
}
