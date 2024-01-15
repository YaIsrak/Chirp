'use client';
import { ChripType } from '@/Type.typing';
import { MoreHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import ChripDeleteButton from './ChripDeleteButton';

export default function ChripMoreButton({ chrip }: { chrip: ChripType }) {
	const { data: Session } = useSession();

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<MoreHorizontal />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuGroup className='font-semibold'>
						{chrip.user.email === Session?.user?.email && (
							<DropdownMenuItem className='text-red-500'>
								<ChripDeleteButton postid={chrip._id} />
							</DropdownMenuItem>
						)}
						<DropdownMenuItem> Mute</DropdownMenuItem>
						<DropdownMenuItem className='text-red-500'>Report</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
