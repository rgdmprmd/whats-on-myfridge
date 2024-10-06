"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChevronLeft } from "lucide-react";
import { User } from "@/lib/type";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { updateUser } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
	name: z.string().min(2).max(50),
	role: z.string(),
});

export const FormUpdateUser = ({ user }: { user: User }) => {
	const { toast } = useToast();
	const router = useRouter();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: user.name,
			role: user.role,
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		const res = await updateUser(user.id, user.email, values);

		if (!res.success) {
			toast({
				variant: "destructive",
				title: "Save Failed!",
				description: res.message,
				action: <ToastAction altText="Try again">Try again</ToastAction>,
			});
		} else {
			toast({
				variant: "default",
				title: "Action Fired!",
				description: res.message,
			});

			router.push("/dashboard/users");
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex items-center gap-4">
					<Link href="/dashboard/users" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-7 w-7")}>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Back</span>
					</Link>
					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">Update User</h1>
					<div className="hidden items-center gap-2 md:ml-auto md:flex">
						<Link href="/dashboard/users" className={buttonVariants({ variant: "outline", size: "sm" })}>
							Discard
						</Link>
						<Button type="submit" size="sm">
							Save Changes
						</Button>
					</div>
				</div>
				<div className="grid gap-4 lg:grid-cols-1 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
						<Card>
							<CardHeader>
								<CardTitle>User Details</CardTitle>
								<CardDescription>Role is authorization access for a user. Change this means you give or revoke an access from user.</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<Label>Email</Label>
										<p className="border rounded-md py-2 px-3 text-muted-foreground">{user.email}</p>
									</div>
									<div className="grid gap-3">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Name</FormLabel>
													<FormControl>
														<Input type="text" placeholder="Royco ayam" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className="grid gap-3">
										<FormField
											control={form.control}
											name="role"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Role</FormLabel>
													<FormControl>
														<Select onValueChange={(value) => field.onChange(value)} value={field.value}>
															<SelectTrigger>
																<SelectValue placeholder="Select role" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="admin">Admin</SelectItem>
																<SelectItem value="user">User</SelectItem>
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
				<div className="flex items-center justify-center gap-2 md:hidden">
					<Link href="/dashboard/users" className={buttonVariants({ variant: "outline", size: "sm" })}>
						Discard
					</Link>
					<Button type="submit" size="sm">
						Save Changes
					</Button>
				</div>
			</form>
		</Form>
	);
};
