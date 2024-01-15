import { fetchAllChrip } from '@/lib/actions/chrip.action';
import { NextResponse } from 'next/server';

export async function GET() {
	const { data } = await fetchAllChrip();
	return NextResponse.json(data);
}
