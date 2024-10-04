import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import FormSignInUser from "@/components/form-signin-user";

const SignInPage = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<FormSignInUser />
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link href="/sign-up" className="underline">
							Sign Up
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignInPage;
