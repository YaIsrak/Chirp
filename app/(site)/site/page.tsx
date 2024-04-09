import { Button } from '@/components/ui/button';
import View from '@/public/view.png';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoGithub } from 'react-icons/io';

export default function page() {
	return (
		<div className='flex  w-full flex-col items-center justify-center py-[15vmin]'>
			<div className='w-full max-w-xl px-5 xl:px-0'>
				<h1 className=' bg-gradient-to-br from-foreground to-primary bg-clip-text text-transparent font-semibold text-4xl md:text-7xl text-center'>
					Build connection to your next{' '}
					<span className='text-primary font-bold'>Level🔥</span>
				</h1>
				<p className='text-center text-muted-foreground  md:text-xl mt-6'>
					A social media project based on Next.js, MondoDB and Auth.js
				</p>
				{/* Buttons */}
				<div className='flex items-center justify-center mt-6 gap-2'>
					<Button
						variant={'secondary'}
						size={'sm'}
						className='rounded-full font-light'
						asChild
					>
						<Link href={'/'} className='gap-2'>
							<IoLogoGithub />
							Star on GitHub
						</Link>
					</Button>
				</div>

				<div>
					<Image src={View} alt='view' className='border rounded-lg mt-6' />
				</div>

				{/* Footer */}
				<div className='flex items-center justify-center gap-1 text-muted-foreground mt-6'>
					© Copyright reserved by{''}
					<Link
						href={'https://yaserisrak.vercel.app'}
						className='text-primary underline'
					>
						Israk
					</Link>
				</div>
			</div>
		</div>
	);
}
