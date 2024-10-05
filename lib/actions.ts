"use server";

import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";

export type ValueCategory = {
	category_name: string;
};

export type ValueItem = {
	name: string;
	category: string;
};

export type SignUpValues = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
};

export type SignInValues = {
	email: string;
	password: string;
};

export async function authenticate(values: SignInValues) {
	try {
		await signIn("credentials", values);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid Credentials." };
				default:
					return { error: "Something went wrong." };
			}
		}
		throw error;
	}
}

export async function signUp(values: SignUpValues) {
	const hashedPassword = await bcrypt.hash(values.password, 10);
	try {
		await prismadb.user.create({
			data: {
				name: `${values.first_name} ${values.last_name}`,
				email: values.email,
				password: hashedPassword,
			},
		});
	} catch (error) {
		console.log(`Create Error:`, error);
		throw error;
	}

	redirect("/sign-in");
}

export async function createCategory(id: string | null, values: ValueCategory) {
	const slug = slugify(values.category_name);

	try {
		await prismadb.category.create({
			data: {
				name: values.category_name,
				slug: slug,
			},
		});
	} catch (error) {
		console.log(`Create Error:`, error);
		throw error;
	}

	revalidatePath(id ? `/dashboard/items/${id}/update` : `/dashboard/items/create`);
	redirect(id ? `/dashboard/items/${id}/update` : `/dashboard/items/create`);
}

export async function createItem(values: ValueItem) {
	const slug = slugify(values.name);

	try {
		await prismadb.item.create({
			data: {
				name: values.name,
				slug: slug,
				category_id: values.category,
			},
		});
	} catch (error) {
		console.log(`Create Error:`, error);
		throw error;
	}

	revalidatePath("/dashboard/items");
	redirect("/dashboard/items");
}

export async function updateItem(id: string, values: ValueItem) {
	const slug = slugify(values.name);

	try {
		await prismadb.item.update({
			where: {
				id: id,
			},
			data: {
				name: values.name,
				slug: slug,
				category_id: values.category,
			},
		});
	} catch (error) {
		console.log(`Create Error:`, error);
		throw error;
	}

	revalidatePath("/dashboard/items");
	redirect("/dashboard/items");
}

export async function deleteItem(id: string) {
	const session = await auth();
	if (session?.user.role !== "admin") return { success: false, message: "You are not authorized to call this action." };

	try {
		await prismadb.item.delete({ where: { id } });
		revalidatePath("/dashboard/items");
		return { success: true, message: "Item deleted successfully." };
	} catch (error) {
		return { success: false, message: "Database Error: Failed to delete invoice.", error };
	}
}
