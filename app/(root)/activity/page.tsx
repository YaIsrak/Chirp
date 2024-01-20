import Image from 'next/image';

export default function Activity() {
	return (
		<section className='section'>
			<div className='container-lg'>
				<h3>Activity:</h3>
				<div className='flex justify-center items-center h-full'>
					<Image
						src={'/empty.png'}
						alt='empty'
						width={300}
						height={300}
						className='dark:hidden'
					/>
					<Image
						src={'/empty-dark.png'}
						alt='empty'
						width={300}
						height={300}
						className='hidden dark:block'
					/>
					<h3>There&apos; no activity</h3>
				</div>
			</div>
		</section>
	);
}
