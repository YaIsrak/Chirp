'use client';

import { ChripType } from '@/Type.typing';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { addCommentToChrip } from '@/lib/actions/chrip.action';
import { useCurrentUserByEmail } from '@/lib/hooks/useUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '../ui/button';

const formSchema = z.object({
	chrip: z.string().min(2).max(50),
});

export default function CommentForm({ chrip }: { chrip: ChripType }) {
	const router = useRouter();
	const { currentUser, session } = useCurrentUserByEmail();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			chrip: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		currentUser &&
			(await addCommentToChrip(chrip._id, values.chrip, currentUser?._id as string)
				.then(() => {
					toast.success('Chrip posted');
					form.reset();
					router.refresh();
				})
				.catch((error: any) => {
					toast.error(`There is an error: ${error.message}`);
				}));
	};

	if (!session?.user) {
		return <div>Login to reply</div>;
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid grid-cols-6 gap-2'
			>
				<FormField
					control={form.control}
					name='chrip'
					render={({ field }) => (
						<FormItem className='col-span-5'>
							<FormControl>
								<Input placeholder='Start a chrips...' type='text' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={session ? false : true}>
					Submit
				</Button>
			</form>
		</Form>
	);
}
