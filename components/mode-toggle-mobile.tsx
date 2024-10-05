"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

export const ModeToggleMobile = () => {
	const { setTheme, theme } = useTheme();
	const handleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

	return (
		<Link href="#" onClick={handleTheme} className="flex items-center gap-4 px-2.5 text-muted-foreground">
			<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="h-5 w-5 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-onsly">Toggle Theme</span>
		</Link>
	);
};
