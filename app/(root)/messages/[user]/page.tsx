'use client';

export default function page() {
	return (
		<section className='w-full h-screen grid grid-cols-4'>
			{/* Right column */}
			<div>
				<Chat />
			</div>

			{/* Chat */}
			<div className='col-span-2 border-x '>
				<h1>hello</h1>
			</div>

			{/* Profile */}
			<div>
				<h1>hello</h1>
			</div>
		</section>
	);
}

export function Chat() {
	return <h1>Chat</h1>;
}
