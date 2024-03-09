import { IconType } from 'react-icons';
import { BiSolidMessageSquareDots } from 'react-icons/bi';
import { GoHomeFill, GoSearch } from 'react-icons/go';
import { HiBell } from 'react-icons/hi';
import { IoCreate } from 'react-icons/io5';

export const navItem: { name: string; href: string; icon: IconType }[] = [
	{ name: 'Home', href: '/', icon: GoHomeFill },
	{
		name: 'Search',
		href: '/search',
		icon: GoSearch,
	},
	{
		name: 'Create Post',
		href: '/createchrip',
		icon: IoCreate,
	},
	{ name: 'Message', href: '/messages', icon: BiSolidMessageSquareDots },
	{ name: 'Activities', href: '/activity', icon: HiBell },
];
