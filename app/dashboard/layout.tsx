import { SideNav } from "@/components/side-nav";
import { SideNavMobile } from "@/components/side-nav-mobile";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40 ">
			<SideNav />
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<SideNavMobile />
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">{children}</main>
			</div>
		</div>
	);
}
