import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import { z } from "zod";
import { UserAuth } from "@/lib/type";
import { authConfig } from "@/auth.config";
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<UserAuth | undefined> {
	try {
		const user = await prismadb.user.findUnique({ where: { email: email } });
		return user;
	} catch (error) {
		console.error("Failed to fetch user: ", error);
		throw new Error("Failed to fetch user.");
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const parsedCredentials = z
					.object({
						email: z.string({ required_error: "Email is required" }).min(1, "Email is required").email("Invalid email"),
						password: z.string({ required_error: "Password is required" }).min(6, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),
					})
					.safeParse(credentials);

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;

					const user = await getUser(email);
					if (!user) return null;

					const passwordMatch = await bcrypt.compare(password, user.password);
					if (passwordMatch) return user;
				}

				console.log("Invalid credentials");
				return null;
			},
		}),
	],
	callbacks: {
		// Add role to session
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
	},
	session: {
		strategy: "jwt",
	},
});
