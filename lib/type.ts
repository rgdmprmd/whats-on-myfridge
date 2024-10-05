export type User = {
	id: string;
	email: string;
	name: string;
	password: string;
	role: string;
	createdAt: Date;
};

export type CategoryType = {
	name: string;
	slug: string;
	id: string;
};

export type ItemType = {
	id: string;
	name: string;
	slug: string;
	category_id: string;
};

export type ItemAndCategoryType = {
	id: string;
	name: string;
	slug: string;
	category_id: string;
	category: { name: string };
};
