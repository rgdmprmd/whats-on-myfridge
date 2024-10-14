import React from "react";
import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Package2, PanelLeft, Power } from "lucide-react";
import { NavLinksMobile } from "@/components/nav-links-mobile";
import { ModeToggleMobile } from "./mode-toggle-mobile";
import { SessionProvider } from "next-auth/react";
import { signOut } from "@/auth";

export const SideNavMobile = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="outline" className="sm:hidden">
					<PanelLeft className="h-5 w-5" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="sm:max-w-xs">
				<nav className="grid gap-6 text-lg font-medium">
					<Link href="/dashboard" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
						<Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
						<span className="sr-only">Acme Inc</span>
					</Link>
					<SessionProvider>
						<NavLinksMobile />
					</SessionProvider>
					<ModeToggleMobile />
					<form
						action={async () => {
							"use server";
							await signOut();
						}}
					>
						<button type="submit" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
							<Power className="h-5 w-5" /> Sign Out
						</button>
					</form>
				</nav>
			</SheetContent>
		</Sheet>
	);
};
