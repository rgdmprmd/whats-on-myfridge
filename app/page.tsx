import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-2 font-[family-name:var(--font-geist-sans)]">
			<h2 className="font-semibold text-2xl">Whats on My Fridge?</h2>
			<Link href="/dashboard" className={cn(buttonVariants({ size: "sm" }))}>
				Get Started 🚀
			</Link>
		</div>
	);
}
