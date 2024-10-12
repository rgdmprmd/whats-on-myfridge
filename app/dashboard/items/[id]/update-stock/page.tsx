import React from "react";
import prismadb from "@/lib/prismadb";
import { notFound } from "next/navigation";
import { FormUpdateStock } from "@/components/form-update-stock";

const UpdateStockPage = async ({ params }: { params: { id: string } }) => {
	const item = await prismadb.item.findUnique({ where: { id: params.id } });

	if (!item) notFound();

	return (
		<div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
			<FormUpdateStock item={item} />
		</div>
	);
};

export default UpdateStockPage;
