import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	// callbacks: {
	// 	async jwt({ token, user }) {
	// 		if (user) {
	// 			token.user = {
	// 				_id: user.id,
	// 				email: user.email,
	// 				name: user.name,
	// 				image: user.image,
	// 			};
	// 		}
	// 		return token;
	// 	},
	// 	session: async ({ session, token }: any) => {
	// 		if (token) {
	// 			session.user = token.user;
	// 		}
	// 		return session;
	// 	},
	// },
	callbacks: {
		async jwt({ token, user }) {
			if (token || user) {
				token.userRole = 'admin';
			}
			return { ...token };
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
