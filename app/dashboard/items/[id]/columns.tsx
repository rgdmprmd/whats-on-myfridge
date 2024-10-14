"use client";

import React from "react";
import { DataTableColumnHeader } from "@/components/ui/datatable-column-header";
import { ItemLedgerType } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<ItemLedgerType>[] = [
	{
		accessorKey: "timestamp",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Updated at" />,
		cell: ({ row }) => {
			const updatedAt = row.getValue("timestamp") as Date; // Ensure updatedAt is a Date object
			return <span>{formatDate(updatedAt)}</span>; // Format using timeAgo function
		},
	},
	{
		accessorKey: "user_email",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Updated by" />,
	},
	{
		accessorKey: "type",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
	},
	{
		accessorKey: "quantityChange",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Qty Changes" />,
		cell: ({ row }) => <span className="text-right">{row.getValue("quantityChange")}</span>,
	},
];
