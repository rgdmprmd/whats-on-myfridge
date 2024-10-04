import { clsx, type ClassValue } from "clsx";
import { Box, Home } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
export const links = [
	{ name: "Dashboards", href: "/dashboard", icon: Home },
	// { name: "Stocks", href: "/dashboard/stocks", icon: Scroll },
	{ name: "Items", href: "/dashboard/items", icon: Box },
];

export const slugify = (name: string) => {
	return name
		.toLowerCase() // Convert to lowercase
		.trim() // Remove whitespace from both ends
		.replace(/[\s_]+/g, "-") // Replace spaces and underscores with a dash
		.replace(/[^\w\-]+/g, "") // Remove any non-word characters
		.replace(/\-\-+/g, "-") // Replace multiple dashes with a single dash
		.replace(/^-+/, "") // Remove leading dashes
		.replace(/-+$/, ""); // Remove trailing dashes
};
