import React from "react";
import { DataTable } from "@/app/dashboard/items/data-table";
import { columns } from "@/app/dashboard/items/columns";
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
			updatedAt: "desc",
		},
	});

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col items-start">
				<h1 className="text-2xl font-semibold">Items</h1>
				<p className="text-muted-foreground">All available items you can use.</p>
			</div>
			<div>
				<DataTable columns={columns} data={data} createLocation="/dashboard/items/create" />
			</div>
		</div>
	);
};

export default ItemsPage;
