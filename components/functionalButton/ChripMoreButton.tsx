import { ChripType } from '@/Type.typing';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { MoreHorizontal } from 'lucide-react';
import { Session, getServerSession } from 'next-auth';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import ChripDeleteButton from './ChripDeleteButton';

export default async function ChripMoreButton({ chrip }: { chrip: ChripType }) {
	const session: Session | null = await getServerSession(authOptions);

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<MoreHorizontal />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuGroup className='font-semibold'>
						{chrip.user.email === session?.user?.email && (
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
