"use client";

import React from "react";
import { Box, Home, Scroll } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
	{ name: "Dashboards", href: "/dashboard", icon: Home },
	{ name: "Items", href: "/dashboard/items", icon: Box },
	{ name: "Stocks", href: "/dashboard/stocks", icon: Scroll },
];

export const NavLinksMobile = () => {
	const pathname = usePathname();

	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon;
				return (
					<Link key={link.href} href={link.href} className={cn("flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground", { "text-foreground": pathname === link.href })}>
						<LinkIcon className="h-5 w-5" />
						{link.name}
					</Link>
				);
			})}
		</>
	);
};
