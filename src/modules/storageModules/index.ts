import { TUser } from "../../api/types"

const setLocalStorageData = <T>(data:T) =>{
	localStorage.setItem('users', JSON.stringify(data))
}

const getLocalStorageData = (): TUser[] =>{
	return JSON.parse(localStorage.getItem('users') || '[]')
}

export { setLocalStorageData, getLocalStorageData }