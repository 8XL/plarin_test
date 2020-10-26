export type TUser = {
	id?: number,
	email?: string,
	first_name?: string,
	last_name?: string,
	avatar?: string
};
export interface IGetUsers {
	err: boolean,
	users?: TUser[]
};
export interface IGetUser {
	err: boolean,
	user?: TUser
};
export interface IGetUser {
	err: boolean,
	user?: TUser
};
