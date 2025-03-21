import { SideNav } from "@/components/side-nav";
import { SideNavMobile } from "@/components/side-nav-mobile";
import { BreadcrumbsHeader } from "@/components/breadcrumbs-header";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AvatarHeader } from "@/components/avatar-header";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40 ">
			<SideNav />
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
					<SideNavMobile />
					<BreadcrumbsHeader />
					<div className="relative ml-auto flex-1 md:grow-0">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
					</div>
					<AvatarHeader />
				</header>
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
					{children}
					<Toaster />
				</main>
			</div>
		</div>
	);
}
