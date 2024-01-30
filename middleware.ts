import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

export default withAuth(function middleware(request: NextRequest) {}, {
	callbacks: {
		authorized: ({ req, token }) => {
			if (req.nextUrl.pathname.startsWith('/createchrip') && token === null) {
				return false;
			}
			if (
				req.nextUrl.pathname.startsWith('/user/edit-profile') &&
				token === null
			) {
				return false;
			}
			if (req.nextUrl.pathname.startsWith('/messages') && token === null) {
				return false;
			}
			return true;
		},
	},
});
