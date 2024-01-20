import Image from 'next/image';

export default function UserChripReplay() {
	return (
		<div className='flex flex-col items-center justify-center py-12'>
			<Image
				src='/empty.png'
				className='dark:hidden'
				alt=''
				height={200}
				width={200}
			/>
			<Image
				src='/empty-dark.png'
				className='hidden dark:block'
				alt=''
				height={200}
				width={200}
			/>
			<p className='font-medium'>Opps! There&apos;s no replies</p>
		</div>
	);
}
