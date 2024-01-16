import { Loader } from 'lucide-react';

export default function loading() {
	return (
		<div className='h-screen w-full flex justify-center items-center'>
			<Loader className='animate-spin' />
		</div>
	);
}
