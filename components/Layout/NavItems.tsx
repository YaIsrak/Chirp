import {
	HeartIcon,
	HomeIcon,
	PencilIcon,
	SearchIcon,
	Send,
} from 'lucide-react';
import { NavLink } from './Navbar';

export default function NavItems() {
	return (
		<>
			<NavLink path='/'>
				<HomeIcon />
			</NavLink>
			<NavLink path='/search'>
				<SearchIcon />
			</NavLink>
			<NavLink path='/createchrip'>
				<PencilIcon />
			</NavLink>
			<NavLink path='/activity'>
				<HeartIcon />
			</NavLink>
			<NavLink path='/messages'>
				<Send />
			</NavLink>
		</>
	);
}
