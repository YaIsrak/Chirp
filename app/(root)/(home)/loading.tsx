import PostSkeleton from '../skeleton/_skeletons/PostSkeleton';

export default function loading() {
	return (
		<section className='section'>
			<div className='container-lg'>
				<div className=''>
					<PostSkeleton />
					<hr />
					<PostSkeleton />
					<hr />
					<PostSkeleton />
					<hr />
				</div>
			</div>
		</section>
	);
}
