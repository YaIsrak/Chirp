'use client';
import { UserData } from '@/Type.typing';
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
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
	name: z.string().min(2).max(30),
	username: z.string().min(2).max(10),
	bio: z.string().min(2).max(120),
});

export default function AccoutEditForm({
	currentUser,
}: {
	currentUser: UserData;
}) {
	const { data: session } = useSession();
	// const [userInfo, setUserInfo] = useState<UserData | undefined>();

	// useEffect(() => {
	// 	async function fetchData() {
	// 		const response = await fetch(`${baseUrl}/api/users/${session?.user?.email}`);
	// 		const data = await response.json();
	// 		setUserInfo(data);
	// 	}

	// 	fetchData();
	// }, []);

	const route = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: currentUser?.name || session?.user?.name || '',
			username: currentUser?.username || '',
			bio: currentUser?.bio || '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await UpdateUser({
			name: values.name,
			username: values.username,
			image: session?.user?.image as string,
			bio: values.bio,
			email: session?.user?.email as string,
		})
			.then(() => {
				toast.success('Profile Updated');
				route.push(`/`);
			})
			.catch((error) => {
				toast.error(`There is an error: ${error.message}`);
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
