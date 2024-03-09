'use client';
import { useFetchAllUsers } from '@/lib/hooks/useUser';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../ui/command';
import { Input } from '../ui/input';

export default function SearchForm() {
	const [open, setOpen] = useState(false);
	const users = useFetchAllUsers();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	return (
		<>
			<Input
				placeholder='# Search User'
				className='bg-foreground/10 rounded-xl border-none w-96 h-10 hidden md:block'
				onClick={() => setOpen((open) => !open)}
			/>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder='Search User' />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup>
						{users?.map((user) => (
							<CommandItem key={user._id} className='gap-2'>
								<Avatar>
									<AvatarImage src={user.image} alt='Users' />
								</Avatar>
								<p>{user.name}</p>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
