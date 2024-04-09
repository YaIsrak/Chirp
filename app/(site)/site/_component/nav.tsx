'use client';
import { NavBrand } from '@/components/Layout/Navbar';
import SignInButton from '@/components/Layout/SignInButton';

export default function Nav() {
	return (
		<nav className='w-full flex justify-center'>
			<div className='flex h-16 justify-between items-center max-w-screen-xl w-full'>
				<NavBrand />

				<div>
					<SignInButton />
				</div>
			</div>
		</nav>
	);
}
