"use client";

import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import Link from "next/link";
import { authenticate } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

const FormSignInUser = () => {
	const { toast } = useToast();
	const router = useRouter();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		// console.log(values);
		const res = await authenticate(values);
		if (!res.success) {
			toast({
				variant: "destructive",
				title: "Sign in Failed!",
				description: res.message,
				action: <ToastAction altText="Try again">Try again</ToastAction>,
			});
		} else {
			toast({
				variant: "default",
				title: "Action Fired!",
				description: res.message,
			});

			router.push("/dashboard");
		}
	}

	return (
		<div className="grid gap-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="email" placeholder="m@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center">
										<FormLabel>Password</FormLabel>
										<Link href="#" className="ml-auto inline-block text-sm underline">
											Forgot your password?
										</Link>
									</div>
									<FormControl>
										<Input type="password" placeholder="*******" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
					<Button variant="outline" className="w-full">
						Login with Google
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default FormSignInUser;
