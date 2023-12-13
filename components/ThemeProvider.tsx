'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { NextAuthProvider } from './NexAuthProvider';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextAuthProvider>
			<NextThemesProvider {...props}>{children}</NextThemesProvider>
		</NextAuthProvider>
	);
}
