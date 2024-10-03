"use server";

import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ValueCategory = {
	category_name: string;
};

export type ValueItem = {
	name: string;
	category: string;
};

export async function createCategory(values: ValueCategory) {
	try {
		await prismadb.category.create({
			data: {
				name: values.category_name,
			},
		});
	} catch (error) {
		console.log(`Create Error:`, error);
		throw error;
	}

	revalidatePath("/dashboard/items/create");
	redirect("/dashboard/items/create");
}

export async function createItem(values: ValueItem) {
	try {
		await prismadb.item.create({
			data: {
				name: values.name,
				categoryId: values.category,
			},
		});
	} catch (error) {
		console.log(`Create Error:`, error);
		throw error;
	}

	revalidatePath("/dashboard/items");
	redirect("/dashboard/items");
}
