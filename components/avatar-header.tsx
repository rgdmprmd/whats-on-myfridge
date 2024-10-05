import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser, Crown } from "lucide-react";
import { auth, signOut } from "@/auth";

export const AvatarHeader = async () => {
	const session = await auth();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="overflow-hidden rounded-full">
					{session?.user.role === "admin" ? <Crown className="h-5 w-5" /> : <CircleUser className="h-5 w-5" />}
					<span className="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuSeparator />
				<form
					action={async () => {
						"use server";
						await signOut();
					}}
				>
					<button type="submit" className="w-full text-left">
						<DropdownMenuItem>Sign Out</DropdownMenuItem>
					</button>
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
