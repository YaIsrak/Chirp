'use client';
import { UserData } from '@/Type.typing';
import UserCard from '@/components/Card/UserCard';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { useFetchAllUsers } from '@/lib/hooks/useUser';

export default function Search() {
	const users = useFetchAllUsers();

	return (
		<section className='section'>
			<div className='container-lg'>
				<Command>
					<CommandInput placeholder='bla bla' />
					<CommandList>
						<CommandEmpty>No result Found</CommandEmpty>
						<CommandGroup>
							{users?.map((user: UserData) => (
								<CommandItem key={user.id}>
									<UserCard user={user} />
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</div>
		</section>
	);
}
