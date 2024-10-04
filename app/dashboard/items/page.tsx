import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { DataTable } from "@/app/dashboard/items/data-table";
import { columns } from "@/app/dashboard/items/columns";
import { PlusIcon } from "lucide-react";
import prismadb from "@/lib/prismadb";

const ItemsPage = async () => {
	const data = await prismadb.item.findMany({
		include: {
			category: {
				select: {
					name: true, // Only select the 'name' field from Category
				},
			},
		},
		orderBy: {
			name: "asc",
		},
	});

	console.log(data);

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col items-start">
				<h1 className="text-2xl font-semibold">Items</h1>
				<p className="text-muted-foreground">All available items you can use.</p>
			</div>
			<div>
				<Link href="/dashboard/items/create" className={cn(buttonVariants(), "bg-emerald-500 hover:bg-emerald-300")}>
					<PlusIcon className="h-5 md:mr-2" /> <span className="hidden md:block">Add new Item </span>
				</Link>
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	);
};

export default ItemsPage;
