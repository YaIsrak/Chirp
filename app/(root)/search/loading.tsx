import { Skeleton } from '@/components/ui/skeleton';
import UserCardSkeleton from '../skeleton/_skeletons/UserCardSkeleton';

export default function loading() {
	return (
		<section className='section'>
			<div className='container-lg space-y-12'>
				<Skeleton className='h-8 w-full rounded-sm' />

				<div className='space-y-4'>
					{/* user */}
					<UserCardSkeleton />
					<UserCardSkeleton />
					<UserCardSkeleton />
					<UserCardSkeleton />
				</div>
			</div>
		</section>
	);
}
