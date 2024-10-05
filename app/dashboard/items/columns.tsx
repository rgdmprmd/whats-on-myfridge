"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/datatable-column-header";
import { ItemAndCategoryType } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteDialog } from "@/components/delete-dialog";

export const columns: ColumnDef<ItemAndCategoryType>[] = [
	{
		id: "select",
		header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
	},
	{
		accessorKey: "category.name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const item = row.original;

			return <DeleteDialog id={item.id} />;
		},
	},
];
