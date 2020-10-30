import { makeObservable, observable, computed, action, autorun, reaction } from 'mobx';

import { TUser, IGetUsers } from '../../api/types';
import { getUsers } from '../../api';
import { setLocalStorageData } from '../../modules'

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

			workMode: observable,
			getWorkMode: computed,
			toggleWorkMode: action,

			flagChanged: observable,
			getFlagChanged: computed,
			toggleFlagChanged: action
		})
//при инициализации стора обращение к апи за списком пользователей
		autorun(()=>this.fetchUsers())
		reaction(()=>this.getWorkMode,
		mode => {
			if(mode){
				setLocalStorageData(this.users)
			} else {
				this.fetchUsers()
			}
		})
		reaction(()=> this.getUsers,
		users=> {
			setLocalStorageData(users);
			this.getWorkMode && this.toggleFlagChanged()
		})
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

	setUsers = (users: TUser[]) => {
		this.users = users
	}

	fetchUsers: TFetchUsers = async(num?: number) => {
			const data:IGetUsers = await getUsers(num);
			if(data.err)return this.errorUsers = true;
		
			this.setUsers(data.users! as TUser[])
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
		this.modal.id = id || null;
		this.modal.view = !this.modal.view;
	}

// ================= блок пагинации
	pagination: number = 2

	get getPagination():number{
		return this.pagination
	}

//================== блок работы с датой
	workMode: boolean = false

	get getWorkMode(): boolean{
		return this.workMode
	}

	toggleWorkMode = (): void => {
		if(this.getWorkMode)
			if(!window.confirm('r u save all changes?')){
				return 
			}
		this.workMode = !this.workMode
	}

//================== флаг внесенных изменений
	flagChanged: boolean = false

	get getFlagChanged(): boolean{
		return this.flagChanged
	}

	toggleFlagChanged = ():void =>{
		this.flagChanged = true;
	}
}

export default new mainStore();