import { Skeleton } from '@/components/ui/skeleton';

export default function PostSkeleton() {
	return (
		<div className='flex gap-2 py-6'>
			<Skeleton className='w-12 h-12 rounded-full' />

			<div className='space-y-2'>
				<Skeleton className='h-2 w-[250px]' />
				<Skeleton className='h-4 w-[250px]' />

				<div className='flex gap-2'>
					<Skeleton className='h-6 w-6 rounded-full' />
					<Skeleton className='h-6 w-6 rounded-full' />
					<Skeleton className='h-6 w-6 rounded-full' />
				</div>
				<div className='flex gap-6'>
					<Skeleton className='h-2 w-12' />
					<Skeleton className='h-2 w-12' />
					<Skeleton className='h-2 w-12' />
				</div>
			</div>
		</div>
	);
}
