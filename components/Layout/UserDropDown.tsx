'use client';
import { useCurrentUserByEmail } from '@/lib/hooks/useUser';
import { LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import ThemeButton from '../ThemeButton';
import { Avatar, AvatarImage } from '../ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function UserDropDown() {
	const { session, currentUser } = useCurrentUserByEmail();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar>
					<AvatarImage src={session?.user?.image || ''} />
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
				<DropdownMenuLabel className='font-medium text-foreground/50'>
					{session?.user?.email}
				</DropdownMenuLabel>
				<ThemeButton />
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{currentUser && (
						<DropdownMenuItem>
							<Link
								href={`/user/${currentUser?.username}`}
								className='flex items-center text-foreground no-underline'
							>
								<User className='mr-2' />
								Profile
							</Link>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem onClick={() => signOut()}>
						<LogOut className='mr-2' />
						Logout
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
