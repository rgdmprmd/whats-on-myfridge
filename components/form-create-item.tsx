"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChevronLeft } from "lucide-react";
import { CategoryType } from "@/lib/type";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { createItem } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
	name: z.string().min(2).max(50),
	category: z.string(),
	// quantity: z.coerce.number(),
});

export const FormCreateItem = ({ category }: { category: CategoryType[] }) => {
	const { toast } = useToast();
	const router = useRouter();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		const res = await createItem(values);

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

			router.push("/dashboard/items");
		}
	}

	const handleSelectChange = (val: string) => {
		if (val === "new") redirect("/dashboard/category/create?ref=create-item");
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex items-center gap-4">
					<Link href="/dashboard/items" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-7 w-7")}>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Back</span>
					</Link>
					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">Add Item</h1>
					<Badge variant="outline" className="ml-auto md:ml-0">
						New
					</Badge>
					<div className="hidden items-center gap-2 md:ml-auto md:flex">
						<Link href="/dashboard/items" className={buttonVariants({ variant: "outline", size: "sm" })}>
							Discard
						</Link>
						<Button type="submit" size="sm">
							Save Item
						</Button>
					</div>
				</div>
				<div className="grid gap-4 lg:grid-cols-1 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Item Details</CardTitle>
								<CardDescription>Provide clear and concise name, for easier search.</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<FormField
											control={form.control}
											name="category"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Category</FormLabel>
													<FormControl>
														<Select
															onValueChange={(value) => {
																field.onChange(value);
																handleSelectChange(value);
															}}
															value={field.value}
														>
															<SelectTrigger>
																<SelectValue placeholder="Select category" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="new">New Category</SelectItem>
																{category.map((cat: CategoryType) => (
																	<SelectItem key={cat.id} value={cat.id}>
																		{cat.name}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
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
									{/* <div className="grid gap-3">
										<FormField
											control={form.control}
											name="quantity"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Quantity</FormLabel>
													<FormControl>
														<Input type="number" placeholder="Insert quantity" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div> */}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
				<div className="flex items-center justify-center gap-2 md:hidden">
					<Link href="/dashboard/items" className={buttonVariants({ variant: "outline", size: "sm" })}>
						Discard
					</Link>
					<Button type="submit" size="sm">
						Save Product
					</Button>
				</div>
			</form>
		</Form>
	);
};
