import React from "react";
import { FormCreateCategory } from "@/components/form-create-category";

const CreateCategoryPage = () => {
	return (
		<div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
			<FormCreateCategory />
		</div>
	);
};

export default CreateCategoryPage;
