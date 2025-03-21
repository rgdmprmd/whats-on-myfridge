"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button, buttonVariants } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { createCategory } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { ToastAction } from "./ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	category_name: z.string().min(2).max(50),
});

export const FormCreateCategory = ({ itemId, referal }: { itemId: string | null; referal: string | null }) => {
	const { toast } = useToast();
	const router = useRouter();

	let redirectPath = "";

	if (referal === "create-item") {
		redirectPath = "/dashboard/items/create";
	} else if (referal === "update-item") {
		redirectPath = `/dashboard/items/${itemId}/update`;
	} else {
		redirectPath = "/dashboard/category";
	}

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			category_name: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		const res = await createCategory(itemId, values);

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

			router.push(redirectPath);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex items-center gap-4">
					<Link href={redirectPath} className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-7 w-7")}>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Back</span>
					</Link>
					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">Add Category</h1>
					<Badge variant="outline" className="ml-auto md:ml-0">
						New
					</Badge>
					<div className="hidden items-center gap-2 md:ml-auto md:flex">
						<Link href={redirectPath} className={buttonVariants({ variant: "outline", size: "sm" })}>
							Discard
						</Link>
						<Button type="submit" size="sm">
							Save Category
						</Button>
					</div>
				</div>
				<div className="grid gap-4 lg:grid-cols-1 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Category Details</CardTitle>
								<CardDescription>Provide clear and concise name, for easier search.</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<FormField
											control={form.control}
											name="category_name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Category Name</FormLabel>
													<FormControl>
														<Input type="text" placeholder="Food" {...field} />
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
					<Link href={redirectPath} className={buttonVariants({ variant: "outline", size: "sm" })}>
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
