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
import { ItemType } from "@/lib/type";
import Link from "next/link";
import { updateStock } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
	type: z.enum(["INBOUND", "OUTBOUND"]),
	quantityChange: z.coerce.number(),
	reason: z.string(),
});

export const FormUpdateStock = ({ item }: { item: ItemType }) => {
	const { toast } = useToast();
	const router = useRouter();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			quantityChange: item.quantity,
			reason: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		if (values.type === "OUTBOUND") {
			if (values.quantityChange > item.quantity) {
				toast({
					variant: "destructive",
					title: "Update Failed!",
					description: "You can't remove more items than are currently in stock.",
				});
				return false;
			}
		}

		const res = await updateStock(item.id, item.quantity, values);

		if (!res.success) {
			toast({
				variant: "destructive",
				title: "Save Failed!",
				description: res.message,
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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex items-center gap-4">
					<Link href="/dashboard/items" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-7 w-7")}>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Back</span>
					</Link>
					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">Update Stock</h1>
					<div className="hidden items-center gap-2 md:ml-auto md:flex">
						<Link href="/dashboard/items" className={buttonVariants({ variant: "outline", size: "sm" })}>
							Discard
						</Link>
						<Button type="submit" size="sm">
							Update Item
						</Button>
					</div>
				</div>
				<div className="grid gap-4 lg:grid-cols-1 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Update Stock</CardTitle>
								<CardDescription>Please fill information below if you want to update this item stock.</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<FormField
											control={form.control}
											name="type"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														<span className="text-red-500">*</span> Type
													</FormLabel>
													<FormControl>
														<Select onValueChange={(value) => field.onChange(value)} value={field.value}>
															<SelectTrigger>
																<SelectValue placeholder="Select Type" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="INBOUND">INBOUND</SelectItem>
																<SelectItem value="OUTBOUND">OUTBOUND</SelectItem>
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
											name="quantityChange"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														<span className="text-red-500">*</span> Qty Changes
													</FormLabel>
													<FormControl>
														<Input type="number" placeholder="Royco ayam" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-3">
										<FormField
											control={form.control}
											name="reason"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Remarks</FormLabel>
													<FormControl>
														<Input type="text" placeholder="Additional Reason (optional)" {...field} />
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
