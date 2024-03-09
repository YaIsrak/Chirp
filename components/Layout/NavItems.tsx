import { navItem } from '@/lib/constantData';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { Button } from '../ui/button';

export default function NavItems() {
	return (
		<>
			{navItem.map((item) => (
				<NavMenuItem
					key={item.name}
					name={item.name}
					href={item.href}
					icon={item.icon}
				/>
			))}
		</>
	);
}

function NavMenuItem({
	name,
	href,
	icon: Icon,
}: {
	name: string;
	href: string;
	icon: IconType;
}) {
	const pathname = usePathname();
	return (
		<Button
			className={cn('gap-2 rounded-full')}
			variant={pathname === href ? 'default' : 'ghost'}
			size={pathname === href ? 'sm' : 'icon'}
			asChild
		>
			<Link href={href}>
				<Icon className='w-5 h-5' />
				<span className={cn(pathname === href ? 'hidden sm:block' : 'hidden')}>
					{name}
				</span>
			</Link>
		</Button>
	);
}
