"use client";

import React, { FormEvent, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteItem } from "@/lib/actions";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const DeleteDialog = ({ id }: { id: string }) => {
	const [open, setOpen] = useState(false);
	const { toast } = useToast();

	const deleteItemWithId = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await deleteItem(id);
		console.log(res);
		if (!res.success) {
			setOpen(false);
			toast({
				variant: "destructive",
				title: "Delete Failed!",
				description: res.message,
				action: <ToastAction altText="Try again">Try again</ToastAction>,
			});
		} else {
			setOpen(false);
			toast({
				variant: "default",
				title: "Action Fired!",
				description: res.message,
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Link href={`/dashboard/items/${id}/update`}>Update Item</Link>
					</DropdownMenuItem>
					<DialogTrigger asChild>
						<DropdownMenuItem className="hover:cursor-pointer">Delete Item</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<form onSubmit={deleteItemWithId}>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>This action cannot be undone. Are you sure you want to permanently delete this item from our servers?</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Confirm</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
