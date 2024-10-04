import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] border">
			<h1>Not found what you tried to search.</h1>
			<Link href={"/dashboard"} className={buttonVariants({ variant: "link" })}>
				Back
			</Link>
		</div>
	);
};

export default NotFound;
