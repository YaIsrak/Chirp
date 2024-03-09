'use client';
import { UserData } from '@/Type.typing';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { CreateChrip } from '@/lib/actions/chrip.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
	chrip: z.string().min(2),
});
export default function ChripForm({ userInfo }: { userInfo: UserData }) {
	const route = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			chrip: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		userInfo &&
			(await CreateChrip({
				text: values.chrip,
				user: userInfo._id,
				email: userInfo.email,
			})
				.then(() => {
					toast.success('Chrip posted');
					route.push('/');
					route.refresh();
				})
				.catch((error: any) => {
					toast.error(`There is an error: ${error.message}`);
				}));
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='chrip'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea placeholder='Whats on your mind?' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='rounded-full mt-3'>
					Post
				</Button>
			</form>
		</Form>
	);
}
