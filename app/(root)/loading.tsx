import Image from 'next/image';

export default function loading() {
	return (
		<div className='h-screen w-full flex justify-center items-center'>
			<Image src={'/logo-light.png'} alt='' height={100} width={100} />
		</div>
	);
}
