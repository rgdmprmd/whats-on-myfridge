"use client";

import React, { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BreadcrumbsHeader = () => {
	const pathname = usePathname().split("/");

	// Split the pathname and filter out empty values
	const pathSegments = pathname.filter((segment) => segment);
	if (pathSegments.length < 2) return null;

	return (
		<Breadcrumb className="hidden md:flex">
			<BreadcrumbList>
				{pathSegments.map((path, index) => {
					const properPath = path.charAt(0).toUpperCase() + path.slice(1);
					if (index === pathSegments.length - 1) {
						return (
							<Fragment key={index}>
								<BreadcrumbItem>
									<BreadcrumbPage>{properPath}</BreadcrumbPage>
								</BreadcrumbItem>
							</Fragment>
						);
					} else {
						return (
							<Fragment key={index}>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>{properPath}</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</Fragment>
						);
					}
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
