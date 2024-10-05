import React from "react";
import prismadb from "@/lib/prismadb";
import { notFound } from "next/navigation";
import { FormUpdateUser } from "@/components/form-update-user";

const UpdateUserPage = async ({ params }: { params: { id: string } }) => {
	const user = await prismadb.user.findUnique({ where: { id: params.id } });

	if (!user) notFound();

	return (
		<div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
			<FormUpdateUser user={user} />
		</div>
	);
};

export default UpdateUserPage;
