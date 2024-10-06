// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

interface AccessProps {
	name: string;
	href: string;
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
	access: string[];
}

// Extend NextAuth types
declare module "next-auth" {
	interface User {
		role: string; // Add role field to the User type
	}

	interface Session {
		user: {
			role: string; // Add role to the Session user
		} & DefaultSession["user"];
		access: AccessProps[];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		role: string; // Add role to the JWT token
	}
}
