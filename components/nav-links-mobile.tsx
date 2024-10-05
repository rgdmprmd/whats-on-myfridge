"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, links } from "@/lib/utils";
import { useSession } from "next-auth/react";

export const NavLinksMobile = () => {
	const pathname = usePathname();
	const { data: session } = useSession();

	const isExactMatch = (path: string) => pathname === path;
	const isItemsActive = (path: string) => pathname.startsWith(path) && !isExactMatch("/dashboard");

	const isActive = (name: string, path: string) => {
		return (name === "Dashboards" && isExactMatch(path)) || (name !== "Dashboards" && isItemsActive(path));
	};

	return (
		<>
			{links
				.filter((link) => link.access.includes(session?.user.role))
				.map((link) => {
					const LinkIcon = link.icon;
					return (
						<Link key={link.href} href={link.href} className={cn("flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground", { "text-foreground": isActive(link.name, link.href) })}>
							<LinkIcon className="h-5 w-5" />
							{link.name}
						</Link>
					);
				})}
		</>
	);
};
