'use client';

import { SessionProvider } from 'next-auth/react';

export function NextAuthProvider({ children, ...props }: any) {
	return <SessionProvider session={props.session}>{children}</SessionProvider>;
}
