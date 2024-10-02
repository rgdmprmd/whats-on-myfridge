"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Home, Scroll } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{ name: "Dashboards", href: "/dashboard", icon: Home },
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
					<Tooltip key={link.href}>
						<TooltipTrigger asChild>
							<Link href={link.href} className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", { "bg-accent text-accent-foreground": pathname == link.href })}>
								<LinkIcon className="h-5 w-5" />
								<span className="sr-only">{link.name}</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">{link.name}</TooltipContent>
					</Tooltip>
				);
			})}
		</>
	);
};
