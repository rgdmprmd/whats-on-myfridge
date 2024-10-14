import React from "react";
import prismadb from "@/lib/prismadb";
import { DataTable } from "@/app/dashboard/category/data-table";
import { columns } from "@/app/dashboard/category/columns";

const CategoryPage = async () => {
	const data = await prismadb.category.findMany({
		orderBy: {
			name: "asc",
		},
	});

	return (
		<div className="flex flex-col space-y-4 overflow-x-hidden">
			<div className="flex flex-col items-start">
				<h1 className="text-2xl font-semibold">Category</h1>
				<p className="text-muted-foreground">All available category for your item you can use.</p>
			</div>
			<div>
				<DataTable columns={columns} data={data} createLocation="/dashboard/category/create" />
			</div>
		</div>
	);
};

export default CategoryPage;
