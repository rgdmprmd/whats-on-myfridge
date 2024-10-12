export type UserAuth = {
	id: string;
	email: string;
	name: string;
	password: string;
	role: string;
	createdAt: Date;
} | null;

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
	quantity: number;
	category_id: string;
};

export type CategoryColumnType = {
	id: string;
	name: string;
	slug: string;
	createdBy: string;
	updatedBy: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type ItemAndCategoryType = {
	id: string;
	name: string;
	slug: string;
	category_id: string;
	category: { name: string };
};

export type ItemLedgerType = {
	id: string;
	item_id: string;
	type: "OUTBOUND" | "INBOUND";
	quantityChange: number;
	user_email: string;
	reason: string | null;
	timestamp: Date;
};
