import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Empty() {
	return (
		<section className='flex flex-col justify-center items-center h-screen space-y-2'>
			<Image
				src='/empty.png'
				className='dark:hidden'
				alt=''
				height={300}
				width={300}
			/>
			<Image
				src='/empty-dark.png'
				className='hidden dark:block'
				alt=''
				height={300}
				width={300}
			/>
			<h2 className='font-medium'>There&apos; no chrip</h2>
			<Link href={'/createchrip'}>
				<Button>
					<PlusCircle className='w-4 h-4 mr-2' />
					Create Chrip
				</Button>
			</Link>
		</section>
	);
}
