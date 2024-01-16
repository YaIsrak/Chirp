import { fetchUser } from '@/lib/actions/user.action';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { username: string } }
) {
	const user = await fetchUser(params.username);
	return NextResponse.json(user);
}
