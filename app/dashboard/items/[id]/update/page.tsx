import React from "react";
import prismadb from "@/lib/prismadb";
import { FormUpdateItem } from "@/components/form-update-item";
import { notFound } from "next/navigation";

const UpdateItemPage = async ({ params }: { params: { id: string } }) => {
	const category = await prismadb.category.findMany();
	const item = await prismadb.item.findUnique({ where: { id: params.id } });

	if (!item) notFound();

	return (
		<div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
			<FormUpdateItem category={category} item={item} />
		</div>
	);
};

export default UpdateItemPage;
