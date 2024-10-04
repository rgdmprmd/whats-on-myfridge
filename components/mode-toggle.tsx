"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

export const ModeToggle = () => {
	const { setTheme, theme } = useTheme();
	const handleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

	return (
		<Link href="#" onClick={handleTheme} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
			<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="h-5 w-5 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle Theme</span>
		</Link>
	);
};
