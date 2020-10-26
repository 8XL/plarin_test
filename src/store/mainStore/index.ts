import { makeObservable, observable, computed, action, autorun } from 'mobx';

import { TUser, IGetUsers } from '../../api/types';
import { getUsers } from '../../api';
import { IMainStore, TFetchUsers, TModal, TChangeViewModal } from './types';

// стор, отвечающий за основную логику приложения

class mainStore implements IMainStore {

	constructor(){
		makeObservable(this, {
			users: observable,
			errorUsers: observable,
			getUsersError: computed,
			getUsers: computed,
			fetchUsers: action,

			modal: observable,
			getModalId:computed,
			getModalView:computed,
			changeViewModal: action,

			pagination: observable,
			getPagination: computed,
		})
//при инициализации стора обращение к апи за списком пользователей
		autorun(()=>this.fetchUsers())
	}

// ================= блок пользователей
	users: TUser[] = []
	errorUsers: boolean = false
	
	get getUsers():TUser[]{
		return this.users		
	}
	get getUsersError():boolean{
		return this.errorUsers
	}

	fetchUsers: TFetchUsers = async(num?: number) => {
		const data:IGetUsers = await getUsers(num);
		if(data.err)return this.errorUsers = true;
		
		this.users = data.users!;
	}

// ================= блок модалки
	modal: TModal = {
		id: null,
		view: false
	}

	get getModalId():number{
		return this.modal.id!
	}

	get getModalView():boolean{
		return this.modal.view
	}

	changeViewModal: TChangeViewModal = (id?:number) =>{		
		if(id){
			this.modal.id = id;
			this.modal.view = true;
		} else {
			this.modal.id = null;
			this.modal.view = false;
		}
	}

// ================= блок пагинации
	pagination: number = 5

	get getPagination():number{
		return this.pagination
	}
}

export default new mainStore();