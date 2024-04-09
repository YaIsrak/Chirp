import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';

export default function SignInButton() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='bg-primary rounded-full' size='sm'>
					Sign in
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Sign In</DialogTitle>
					<DialogDescription>
						only your email and profile picture will be stored.
					</DialogDescription>
				</DialogHeader>
				<div className='space-y-3'>
					<Button
						className='w-full'
						variant='secondary'
						onClick={() => signIn('google', { callbackUrl: '/user/edit-profile' })}
					>
						Sign in with google
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
