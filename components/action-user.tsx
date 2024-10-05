import React, { FormEvent, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/lib/actions";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const ActionUser = ({ id }: { id: string }) => {
	const [open, setOpen] = useState(false);

	const deleteUserWithId = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		deleteUser(id);
		setOpen(false);
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
						<Link href={`/dashboard/users/${id}/update`}>Update Item</Link>
					</DropdownMenuItem>
					<DialogTrigger asChild>
						<DropdownMenuItem className="hover:cursor-pointer">Delete Item</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<form onSubmit={deleteUserWithId}>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>This action cannot be undone. Are you sure you want to permanently delete this user from our servers?</DialogDescription>
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
