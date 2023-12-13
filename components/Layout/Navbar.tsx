'use client';
import useScroll from '@/lib/hooks/useScroll';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { UserData } from '@/Type.typing';
import { useSession } from 'next-auth/react';
import NavItems from './NavItems';
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
				<div className='container flex h-16 items-center justify-between w-full'>
					<NavBrand />

					{/* Center Menu */}
					<div className='hidden md:flex items-center gap-5'>
						<NavItems />
					</div>

					{/* SideMenu */}
					<div className='flex items-center gap-3'>
						{/* user */}
						<div className=''>
							<UserButton session={Session} />
						</div>
					</div>

					{/* Moblie menu */}
				</div>
			</nav>
			<nav className='fixed bottom-0 w-full flex md:hidden justify-between border-t bg-background/50 backdrop-blur-xl z-30 transition-all'>
				<NavItems />
			</nav>
		</>
	);
}

export function NavLink({
	path,
	children,
}: {
	path: string;
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	return (
		<Link
			href={path}
			className={`no-underline  py-4 px-5 rounded-lg bg-foreground/0 hover:bg-foreground/10 transition
			${pathname === path ? 'text-foreground' : 'text-foreground/40'}
			`}
		>
			{children}
		</Link>
	);
}

export function NavBrand() {
	return (
		<Link
			href='/'
			className='text-2xl no-underline font-semibold text-foreground'
		>
			<p>Chrip</p>
		</Link>
	);
}

export function UserButton({
	session,
}: {
	session?: Session | null;
	userinfo?: UserData;
}) {
	return <>{session ? <UserDropDown session={session} /> : <SignInButton />}</>;
}
