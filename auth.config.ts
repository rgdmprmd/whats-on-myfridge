import type { NextAuthConfig } from "next-auth";
import { links } from "@/lib/utils";

export const authConfig = {
	pages: {
		signIn: "/sign-in",
	},
	callbacks: {
		async jwt({ token, user }) {
			// Attach role to token
			if (user) token.role = user.role;
			return token;
		},
		async session({ session, token }) {
			// Add role to session
			if (token.role) session.user.role = token.role;
			return session;
		},
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const requestedPath = nextUrl.pathname;
			const userRole = auth?.user?.role;

			const matchedRoute = links.find((route) => requestedPath.startsWith(route.href));

			if (matchedRoute) {
				if (isLoggedIn) {
					// Check if the user's role is allowed for this route
					const hasAccess = matchedRoute.access.includes(userRole);
					return hasAccess; // Return true if user has access, otherwise false
				}
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL("/dashboard", nextUrl)); // Redirect to dashboard if logged in but not on a protected route
			}

			return true; // Allow access for non-dashboard routes
		},
	},
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
