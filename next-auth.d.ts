// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

// Extend NextAuth types
declare module "next-auth" {
	interface User {
		role: string; // Add role field to the User type
	}

	interface Session {
		user: {
			role: string; // Add role to the Session user
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		role: string; // Add role to the JWT token
	}
}
