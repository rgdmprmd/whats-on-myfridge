import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FormSignUpUser } from "@/components/form-signup-user";

const SignUpPage = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<Card className="max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Sign Up</CardTitle>
					<CardDescription>Enter your information to create an account</CardDescription>
				</CardHeader>
				<CardContent>
					<FormSignUpUser />
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link href="/sign-in" className="underline">
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignUpPage;
