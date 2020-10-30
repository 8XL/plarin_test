import axios from 'axios';
import { getLocalStorageData } from '../modules';

import { IGetUsers, IGetUser, TUser } from './types';

// Круд запросы. Возврат объекта с ошибкой для вставки заглушки
//или редиректа

const URL: string = 'https://reqres.in/api/users';

const getUsers = async(num?:number) => {
	try{
		const { data } = await axios.get(num ? URL + `?page=${num}` : URL)
		return {
			users: data.data,
			err: false
		} as IGetUsers
	} catch(err) {
		return {err: true} as IGetUsers
	}
}

const getUser = async(id: number) => {
	try{
		const { data } = await axios.get(URL + `/` + id);
		return {
			user: data.data,
			err: false
		} as  IGetUser
	}catch(err){
		return {err: true} as IGetUser
	}
}

const postUser = (user: TUser) =>{
	try {
		axios.post(URL, {
			data: JSON.stringify(user)
		})
	} catch (error) {
		console.log(error)
	}
}

const deleteUser = async(id:number) => {
	try {
		axios.delete(URL + `/` + id)
	} catch (error) {
		console.log(error)
	}
}

const putUser = async(id: number, user:TUser) => {
	try{
		const { data } = await axios.put(URL + `/` + id, {
			data: JSON.stringify(user)
		});
		return {
			user: data.data,
			err: false
		} as  IGetUser
	}catch(err){
		return {err: true} as IGetUser
	}
}
// отправка изменений
const saveChanges = async(): Promise<void> => {
	getLocalStorageData().forEach( async user=>{
		user.changed&& await putUser(user.id!, user)
	});
	setTimeout(()=>window.location.reload());
}

export { getUsers, getUser, deleteUser, putUser, postUser, saveChanges }