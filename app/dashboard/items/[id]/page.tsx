import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import prismadb from "@/lib/prismadb";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { DataTable } from "@/app/dashboard/items/[id]/data-table";
import { columns } from "@/app/dashboard/items/[id]/columns";

const ItemsDetails = async ({ params }: { params: { id: string } }) => {
	const item = await prismadb.item.findUnique({ where: { id: params.id } });
	if (!item) notFound();

	const data = await prismadb.itemTransaction.findMany({
		where: { item_id: params.id },
		include: {
			performedBy: {
				select: {
					email: true,
					name: true,
				},
			},
		},
	});

	// Initialize counters for inbound and outbound
	let totalInbound = 0;
	let totalOutbound = 0;

	// Find the most recent transaction
	let lastUpdated: Date | null = null;

	// Iterate over the results and sum the values based on transactionType
	data.forEach((transaction) => {
		if (transaction.type === "INBOUND") {
			totalInbound += transaction.quantityChange;
		} else if (transaction.type === "OUTBOUND") {
			totalOutbound += transaction.quantityChange;
			totalOutbound *= -1;
		}

		// Check if this transaction is the most recent
		if (!lastUpdated || new Date(transaction.timestamp) > new Date(lastUpdated)) {
			lastUpdated = transaction.timestamp;
		}
	});

	// Format the last updated date for rendering
	const formattedLastUpdated = lastUpdated ? formatDate(new Date(lastUpdated)) : "N/A";

	return (
		<div className="space-y-6 overflow-x-hidden">
			<Card>
				<CardHeader className="pb-4">
					<CardTitle>{item.name} Details</CardTitle>
					<CardDescription className="leading-relaxed">
						View the detailed information about <span className="text-foreground">{item.name}</span>, including its current stock, category, and recent transactions. Last update at <span className="text-foreground">{formattedLastUpdated}</span>
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Link href={`/dashboard/items`} className={cn(buttonVariants({ variant: "outline" }), "mr-2")}>
						Back
					</Link>
					<Link href={`/dashboard/items/${params.id}/update-stock`} className={cn(buttonVariants())}>
						Update Stock
					</Link>
				</CardFooter>
			</Card>
			<div className="flex flex-col md:flex-row items-center justify-between gap-4">
				<Card className="w-full">
					<CardHeader className="pb-2">
						<CardDescription>Total Inbound</CardDescription>
						<CardTitle className="text-4xl">{totalInbound}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-xs text-muted-foreground">+25% from last week</div>
					</CardContent>
					<CardFooter></CardFooter>
				</Card>
				<Card className="w-full">
					<CardHeader className="pb-2">
						<CardDescription>Total Outbound</CardDescription>
						<CardTitle className="text-4xl">{totalOutbound}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-xs text-muted-foreground">+10% from last month</div>
					</CardContent>
					<CardFooter></CardFooter>
				</Card>
			</div>
			<div>
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	);
};

export default ItemsDetails;
