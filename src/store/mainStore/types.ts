import { TUser } from "../../api/types";

export type TFetchUsers = () => Promise<boolean | void>
export type TChangeViewModal = (id?: number) => void
export type TModal = {
	id: number | null,
	view: boolean
}

export interface IMainStore {
	users: TUser[]
	errorUsers: boolean
	getUsersError: boolean
	pagination: number
	getPagination: number
	getUsers: TUser[]
	fetchUsers: TFetchUsers
	modal: TModal
	getModalId: number
	getModalView: boolean
	changeViewModal: TChangeViewModal
}