"use client";

import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BreadcrumbsHeader = () => {
	const pathname = usePathname().split("/");
	pathname.shift();
	if (pathname.length < 2) return null;

	return (
		<Breadcrumb className="hidden md:flex">
			<BreadcrumbList>
				{pathname.map((path, index) => {
					if (index === pathname.length - 1) {
						return (
							<>
								<BreadcrumbItem>
									<BreadcrumbPage>{path.charAt(0).toUpperCase() + path.slice(1)}</BreadcrumbPage>
								</BreadcrumbItem>
							</>
						);
					} else {
						return (
							<>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link href={`/${path}`}>{path.charAt(0).toUpperCase() + path.slice(1)}</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</>
						);
					}
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
