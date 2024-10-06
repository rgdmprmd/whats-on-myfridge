import React from "react";
import { FormCreateCategory } from "@/components/form-create-category";

interface Props {
	searchParams: { [key: string]: string };
}

const CreateCategoryPage = ({ searchParams }: Props) => {
	const referal = Object.keys(searchParams).length ? searchParams.ref : null;
	const itemId = Object.keys(searchParams).length ? searchParams.item : null;

	return (
		<div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
			<FormCreateCategory itemId={itemId} referal={referal} />
		</div>
	);
};

export default CreateCategoryPage;
