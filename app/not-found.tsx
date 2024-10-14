import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center">
			<h1>Currently the page you are looking for is under development, or just you are trying to search something void.</h1>
			<Link href={"/"} className={buttonVariants({ variant: "link" })}>
				Bring me Back
			</Link>
		</div>
	);
};

export default NotFound;
