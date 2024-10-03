import React from "react";
import { FormCreateItem } from "@/components/form-create-item";
import prismadb from "@/lib/prismadb";

const CreateItemsPage = async () => {
	const category = await prismadb.category.findMany();

	return (
		<div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
			<FormCreateItem category={category} />
		</div>
	);
};

export default CreateItemsPage;
