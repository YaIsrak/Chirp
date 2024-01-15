import { fetchSingleChrip } from '@/lib/actions/chrip.action';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { postId: string } }
) {
	const chrip = await fetchSingleChrip(params.postId);

	return NextResponse.json(chrip);
}
