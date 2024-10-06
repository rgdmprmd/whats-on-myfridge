import React from "react";
import prismadb from "@/lib/prismadb";
import { notFound } from "next/navigation";
import { FormUpdateCategory } from "@/components/form-update-category";

const UpdateCategoryPage = async ({ params }: { params: { id: string } }) => {
	const category = await prismadb.category.findUnique({ where: { id: params.id }, select: { id: true, name: true } });

	if (!category) notFound();

	return (
		<div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
			<FormUpdateCategory category={category} />
		</div>
	);
};

export default UpdateCategoryPage;
