"use server";

import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export type ValueCategory = {
	category_name: string;
};

export type ValueItem = {
	name: string;
	category: string;
	quantity: number;
};

export type ValueUser = {
	name: string;
	role: string;
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

export async function checkSession(type: "get" | "strict" | "admin-only", email?: string) {
	const session = await auth();
	if (!session?.user) return { success: false, message: "You are not authorized to call this action.", data: null };

	switch (type) {
		case "strict":
			if (session?.user.role !== "admin") return { success: false, message: "You are not authorized to call this action.", data: null };
			if (session.user.email === email) return { success: false, message: "You are trying to update yourself.", data: null };
			return { success: true, message: "User authorized to continue", data: session };
		case "admin-only":
			if (session?.user.role !== "admin") return { success: false, message: "You are not authorized to call this action.", data: null };
			return { success: true, message: "User authorized to continue", data: session };

		case "get":
			return { success: true, message: "User authorized to continue", data: session };

		default:
			return { success: false, message: "Something went wrong at session check." };
	}
}

export async function authenticate(values: SignInValues) {
	try {
		const result = await signIn("credentials", { ...values, redirect: false });
		if (result?.error) throw new AuthError(result.error);
		return { success: true, message: "Signed in successfully." };
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { success: false, message: "Invalid Credentials." };
				default:
					return { success: false, message: "Database Error: Something went wrong." };
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
				createdBy: values.email,
			},
		});
	} catch (error) {
		console.log(`Create Error:`, error);
		throw error;
	}

	redirect("/sign-in");
}

export async function createCategory(id: string | null, values: ValueCategory) {
	const sessionCheck = await checkSession("get");
	if (!sessionCheck.success) return { success: false, message: sessionCheck.message };

	const slug = slugify(values.category_name);

	try {
		await prismadb.category.create({
			data: {
				name: values.category_name,
				slug: slug,
				createdBy: sessionCheck.data?.user.email,
			},
		});

		revalidatePath(id ? `/dashboard/items/${id}/update` : `/dashboard/items/create`);
		return { success: true, message: "Category created successfully." };
	} catch (error) {
		console.log(`Create Error:`, error);
		return { success: false, message: "Database Error: Failed to create category.", error };
	}
}

export async function createItem(values: ValueItem) {
	const sessionCheck = await checkSession("get");
	if (!sessionCheck.success) return { success: false, message: sessionCheck.message };

	const slug = slugify(values.name);

	try {
		await prismadb.item.create({
			data: {
				name: values.name,
				slug: slug,
				quantity: values.quantity,
				category_id: values.category,
				createdBy: sessionCheck.data?.user.email,
			},
		});

		revalidatePath("/dashboard/items");
		return { success: true, message: "Item created successfully." };
	} catch (error) {
		console.log(`Create Error:`, error);
		return { success: false, message: "Database Error: Failed to create item.", error };
	}
}

export async function updateItem(id: string, values: ValueItem) {
	const sessionCheck = await checkSession("get");
	if (!sessionCheck.success) return { success: false, message: sessionCheck.message };

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
				quantity: values.quantity,
				updatedBy: sessionCheck.data?.user.email,
			},
		});
		revalidatePath("/dashboard/items");
		return { success: true, message: "Item updated successfully." };
	} catch (error) {
		console.log(`Create Error:`, error);
		return { success: false, message: "Database Error: Failed to update item.", error };
	}
}

export async function updateCategory(id: string, values: ValueCategory) {
	const sessionCheck = await checkSession("get");
	if (!sessionCheck.success) return { success: false, message: sessionCheck.message };

	const slug = slugify(values.category_name);

	try {
		await prismadb.category.update({
			where: {
				id: id,
			},
			data: {
				name: values.category_name,
				slug: slug,
				updatedBy: sessionCheck.data?.user.email,
			},
		});
		revalidatePath("/dashboard/category");
		return { success: true, message: "Category updated successfully." };
	} catch (error) {
		console.log(`Create Error:`, error);
		return { success: false, message: "Database Error: Failed to update category.", error };
	}
}

export async function deleteItem(id: string) {
	const sessionCheck = await checkSession("admin-only");
	if (!sessionCheck.success) return { success: false, message: sessionCheck.message };

	try {
		await prismadb.item.delete({ where: { id } });
		revalidatePath("/dashboard/items");
		return { success: true, message: "Item deleted successfully." };
	} catch (error) {
		return { success: false, message: "Database Error: Failed to delete item.", error };
	}
}

export async function deleteCategory(id: string) {
	const sessionCheck = await checkSession("admin-only");
	if (!sessionCheck.success) return { success: false, message: sessionCheck.message };

	try {
		await prismadb.category.delete({ where: { id } });
		revalidatePath("/dashboard/category");
		return { success: true, message: "Category deleted successfully." };
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			switch (error.code) {
				case "P2002": // Unique constraint failed
					// console.error("Unique constraint failed:", error.message);
					return { success: false, message: `Unique constraint failed: ${error.message}` };
				case "P2003": // Unique constraint failed
					// console.error("Unique constraint failed:", error.message);
					return { success: false, message: `You are trying to delete category that already have an item.` };
				case "P2016": // Foreign key constraint failed
					// console.error("Foreign key constraint failed:", error.message);
					return { success: false, message: `Foreign key constraint failed: ${error.message}` };
				default:
					// console.error("Known request error:", error.message);
					return { success: false, message: `Known request error: ${error.message}` };
			}
		}
		throw error;
	}
}

export async function deleteUser(id: string, email: string) {
	const sessionCheck = await checkSession("strict", email);
	if (!sessionCheck.success) return { success: false, message: sessionCheck.message };

	try {
		await prismadb.user.delete({ where: { id } });
		revalidatePath("/dashboard/users");
		return { success: true, message: "User deleted successfully." };
	} catch (error) {
		return { success: false, message: "Database Error: Failed to delete user.", error };
	}
}

export async function updateUser(id: string, email: string, values: ValueUser) {
	const sessionCheck = await checkSession("strict", email);
	if (!sessionCheck.success) return { success: false, message: sessionCheck.message };

	try {
		await prismadb.user.update({
			where: {
				id: id,
			},
			data: {
				name: values.name,
				role: values.role,
				updatedBy: sessionCheck.data?.user.email,
			},
		});
		revalidatePath("/dashboard/users");
		return { success: true, message: "User updated successfully." };
	} catch (error) {
		console.log(`Create Error:`, error);
		return { success: false, message: "Database Error: Failed to update user.", error };
	}
}
