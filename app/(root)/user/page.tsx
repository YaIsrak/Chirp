import { UserData } from '@/Type.typing';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { fetchAllUser } from '@/lib/actions/user.action';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function page() {
	const Users: UserData[] = await fetchAllUser();

	return (
		<section className='section'>
			<div className='container'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Users.map((uData: UserData) => (
							<TableRow key={uData._id}>
								<TableCell>{uData.name}</TableCell>
								<TableCell>{uData.email}</TableCell>

								<TableCell
									className={cn(
										'font-semibold uppercase',
										uData.status === 'ban' ? 'text-red-500' : 'text-green-500'
									)}
								>
									{uData.status}
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='outline'>Action</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<Link href={`/user/${uData.username}`}>
												<DropdownMenuItem>View Profile</DropdownMenuItem>
											</Link>
											<DropdownMenuItem className='text-red-500 font-semibold'>
												Ban
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</section>
	);
}
