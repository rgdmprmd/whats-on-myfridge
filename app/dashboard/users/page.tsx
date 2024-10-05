import prismadb from "@/lib/prismadb";
import React from "react";
import { DataTable } from "@/app/dashboard/users/data-table";
import { columns } from "@/app/dashboard/users/columns";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const UserPage = async () => {
	const session = await auth();
	if (session?.user.role !== "admin") redirect("/dashboard");

	const data = await prismadb.user.findMany({
		orderBy: {
			createdAt: "asc",
		},
	});

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col items-start">
				<h1 className="text-2xl font-semibold">Users</h1>
				<p className="text-muted-foreground">You can manage user role here.</p>
			</div>
			<div>
				<DataTable columns={columns} data={data} createLocation="/dashboard/items/create" />
			</div>
		</div>
	);
};

export default UserPage;
