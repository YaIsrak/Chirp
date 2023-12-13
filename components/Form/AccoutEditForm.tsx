'use client';
import { SessionType, UserData } from '@/Type.typing';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UpdateUser } from '@/lib/actions/user.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '../ui/use-toast';

const formSchema = z.object({
	name: z.string().min(2).max(30),
	username: z.string().min(2).max(10),
	bio: z.string().min(2).max(120),
});

export default function AccoutEditForm({
	session,
	userInfo,
}: {
	session: SessionType | null;
	userInfo: UserData;
}) {
	const route = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: userInfo.name || session?.user.name || '',
			username: userInfo.username || '',
			bio: userInfo.bio || '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await UpdateUser({
			name: values.name,
			username: values.username,
			image: session?.user.image as string,
			bio: values.bio,
			email: session?.user.email as string,
		})
			.then(() => {
				toast({
					title: 'Profile Updated',
					description: `name: ${values.name} \n 
					Username: ${values.username}`,
				});
				route.push(`/`);
			})
			.catch((error) => {
				toast({
					title: 'There is an error',
					description: error.message,
					variant: 'destructive',
				});
			});
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder='Name...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='Username' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Input placeholder='Bio' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Save</Button>
			</form>
		</Form>
	);
}
