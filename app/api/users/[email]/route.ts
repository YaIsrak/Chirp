import { fetchUserByEmail } from '@/lib/actions/user.action';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { email: string } }
) {
	const user = await fetchUserByEmail(params.email);
	return NextResponse.json(user);
}
