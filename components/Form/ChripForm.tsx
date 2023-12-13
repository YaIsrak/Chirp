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
import { Input } from '@/components/ui/input';
import { CreateChrip } from '@/lib/actions/chrip.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '../ui/use-toast';

const formSchema = z.object({
	chrip: z.string().min(2).max(50),
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
		await CreateChrip({
			text: values.chrip,
			user: userInfo._id,
			email: userInfo.email,
		})
			.then(() => {
				toast({
					title: 'Chrip Posted',
				});
				route.push('/');
				route.refresh();
			})
			.catch((error: any) => {
				toast({
					title: 'There is an error',
					description: `${error.message}`,
					variant: 'destructive',
				});
			});
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
								<Input placeholder='Start a chrips...' {...field} />
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
