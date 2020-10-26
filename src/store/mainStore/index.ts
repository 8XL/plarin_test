import { makeObservable, observable, computed, action, autorun, reaction } from 'mobx';

import { TUser, IGetUsers } from '../../api/types';
import { getUsers } from '../../api';
import { IMainStore, TFetchUsers, TModal, TChangeViewModal } from './types';

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

		autorun(()=>this.fetchUsers())
	}

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

	pagination: number = 5

	get getPagination():number{
		return this.pagination
	}
}

export default new mainStore();