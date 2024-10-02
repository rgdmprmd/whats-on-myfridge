import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";

export function SideNav() {
	return (
		<div className="flex h-full flex-col px-3 py-4 md:px-2">
			<Link className="mb-2 flex h-20 items-center justify-start font-semibold bg-emerald-500 text-white rounded-md  p-4 md:h-20" href="/">
				whats-on-my-fridge
			</Link>
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				<NavLinks />
				<div className="hidden h-auto w-full grow md:block"></div>
				<form
				// action={async () => {
				// 	"use server";
				// 	await signOut();
				// }}
				>
					<Button type="submit" variant="link">
						<Power /> <span className="hidden md:block">Sign Out</span>
					</Button>
				</form>
			</div>
		</div>
	);
}
