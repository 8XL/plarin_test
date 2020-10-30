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
	setUsers: (data: TUser[])=>void
	pagination: number
	getPagination: number
	getUsers: TUser[]
	fetchUsers: TFetchUsers
	modal: TModal
	getModalId: number
	getModalView: boolean
	changeViewModal: TChangeViewModal
	workMode: boolean
	getWorkMode: boolean
	toggleWorkMode: ()=>void
	flagChanged: boolean
	getFlagChanged: boolean
	toggleFlagChanged: ()=>void
}