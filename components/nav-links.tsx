"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn, links } from "@/lib/utils";

export const NavLinks = () => {
	const pathname = usePathname();
	const isExactMatch = (path: string) => pathname === path;
	const isItemsActive = (path: string) => pathname.startsWith(path) && !isExactMatch("/dashboard");

	const isActive = (name: string, path: string) => {
		return (name === "Dashboards" && isExactMatch(path)) || (name !== "Dashboards" && isItemsActive(path));
	};

	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon;
				return (
					<Tooltip key={link.href}>
						<TooltipTrigger asChild>
							<Link href={link.href} className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", { "bg-accent text-accent-foreground": isActive(link.name, link.href) })}>
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
