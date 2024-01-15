'use client';
import { UserData } from '@/Type.typing';
import { LogOut, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
	const { data: session } = useSession();
	const [userInfo, setUserInfo] = useState<UserData>();

	useEffect(() => {
		async function fetchData() {
			await fetch(`http://localhost:3000/api/users/${session?.user?.email}`)
				.then((res) => res.json())
				.then((data) => setUserInfo(data));
		}

		fetchData();
	}, []);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar>
					<AvatarImage src={session?.user?.image || ''} />
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
				<DropdownMenuLabel className='font-medium text-foreground/50'>
					{session?.user?.email}
				</DropdownMenuLabel>
				<ThemeButton />
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{userInfo && (
						<DropdownMenuItem>
							<Link
								href={`/user/${userInfo?.username}`}
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
