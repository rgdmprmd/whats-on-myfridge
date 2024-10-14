import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Package2, Power } from "lucide-react";
import { NavLinks } from "@/components/nav-links";
import { ModeToggle } from "@/components/mode-toggle";
import { SessionProvider } from "next-auth/react";
import { signOut } from "@/auth";

export function SideNav() {
	return (
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<TooltipProvider>
				<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
					<Link href="/dashboard" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
						<Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
						<span className="sr-only">Acme Inc</span>
					</Link>
					<SessionProvider>
						<NavLinks />
					</SessionProvider>
				</nav>
				<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
					<Tooltip>
						<TooltipTrigger asChild>
							<ModeToggle />
						</TooltipTrigger>
						<TooltipContent side="right">Dark Mode</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<form
								action={async () => {
									"use server";
									await signOut();
								}}
							>
								<button type="submit" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
									<Power className="h-5 w-5" />
									<span className="sr-only">Sign Out</span>
								</button>
							</form>
						</TooltipTrigger>
						<TooltipContent side="right">Sign Out</TooltipContent>
					</Tooltip>
				</nav>
			</TooltipProvider>
		</aside>
	);
}
