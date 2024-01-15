import { fetchAllChrip } from '@/lib/actions/chrip.action';
import { NextResponse } from 'next/server';

export async function GET() {
	// const userinfo = await fetchAllUser();
	const chrips = await fetchAllChrip();
	return NextResponse.json(chrips);
}
