import { clsx, type ClassValue } from "clsx";
import { Box, Home, Tags, UserCog } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

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

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
export const links = [
	// { name: "Stocks", href: "/dashboard/stocks", icon: Scroll },
	{ name: "Dashboards", href: "/dashboard", icon: Home, access: ["admin", "user"] },
	{ name: "Items", href: "/dashboard/items", icon: Box, access: ["admin", "user"] },
	{ name: "Category", href: "/dashboard/category", icon: Tags, access: ["admin", "user"] },
	{ name: "Users", href: "/dashboard/users", icon: UserCog, access: ["admin"] },
];

export const timeAgo = (date: Date): string => {
	const now = new Date();
	const elapsed = (now.getTime() - date.getTime()) / 1000; // time difference in seconds

	// Create an instance of Intl.RelativeTimeFormat for English (you can change locale)
	const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

	if (elapsed < 60) {
		return rtf.format(-Math.floor(elapsed), "second");
	} else if (elapsed < 3600) {
		return rtf.format(-Math.floor(elapsed / 60), "minute");
	} else if (elapsed < 86400) {
		return rtf.format(-Math.floor(elapsed / 3600), "hour");
	} else {
		return rtf.format(-Math.floor(elapsed / 86400), "day");
	}
};
