import { clsx, type ClassValue } from "clsx";
import { Box, Home, Scroll } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
export const links = [
	{ name: "Dashboards", href: "/dashboard", icon: Home },
	{ name: "Items", href: "/dashboard/items", icon: Box },
	{ name: "Stocks", href: "/dashboard/stocks", icon: Scroll },
];
