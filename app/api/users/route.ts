import { fetchAllUser } from '@/lib/actions/user.action';
import { NextResponse } from 'next/server';

export async function GET() {
	const userinfo = await fetchAllUser();
	return NextResponse.json(userinfo);
}
