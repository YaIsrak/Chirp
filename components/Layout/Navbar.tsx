'use client';
import useScroll from '@/lib/hooks/useScroll';
import { Session } from 'next-auth';
import Link from 'next/link';

import LogoDark from '@/public/logo-dark.png';
import LogoLight from '@/public/logo-light.png';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import NavItems from './NavItems';
import SearchForm from './SearchForm';
import SignInButton from './SignInButton';
import UserDropDown from './UserDropDown';

export default function Navbar() {
	const scrolled = useScroll(50);
	const { data: Session } = useSession();

	return (
		<>
			<nav
				className={`fixed top-0 w-full flex justify-center ${
					scrolled ? 'border-b bg-background/50 backdrop-blur-xl' : 'bg-background/0'
				} z-30 transition-all`}
			>
				<div className='container flex h-16 items-center w-full gap-4'>
					<NavBrand />
					<SearchForm />

					<div className='mx-auto'></div>

					{/* SideMenu */}
					<div className='flex items-center gap-3'>
						<NavItems />
						<Separator orientation='vertical' className='h-10 bg-foreground/40' />
						{/* user */}
						<UserButton session={Session} />
					</div>
				</div>
			</nav>
		</>
	);
}

export function NavBrand() {
	return (
		<Link
			href='/'
			className='text-2xl no-underline font-semibold text-foreground flex items-center gap-2'
		>
			<Image
				src={LogoLight}
				alt='Logo'
				width={100}
				className='w-12 dark:block hidden'
			/>
			<Image
				src={LogoDark}
				alt='Logo'
				width={100}
				className='w-12 dark:hidden block'
			/>
		</Link>
	);
}

export function UserButton({ session }: { session?: Session | null }) {
	return <>{session ? <UserDropDown /> : <SignInButton />}</>;
}
