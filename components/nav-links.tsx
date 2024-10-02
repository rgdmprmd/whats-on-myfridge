"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Home, Scroll } from "lucide-react";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{ name: "Home", href: "/dashboard", icon: Home },
	{ name: "Items", href: "/dashboard/items", icon: Box },
	{ name: "Stocks", href: "/dashboard/stocks", icon: Scroll },
];

export const NavLinks = () => {
	const pathname = usePathname();

	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon;
				return (
					<Link key={link.name} href={link.href} className={cn("text-muted-foreground py-1 px-4 hover:bg-emerald-100 hover:text-foreground rounded-md md:flex-none md:justify-start md:p-2 md:px-3", { "text-foreground bg-emerald-100": link.href === pathname })}>
						<LinkIcon className="w-6 inline-block md:hidden" />
						<p className="hidden md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
};
