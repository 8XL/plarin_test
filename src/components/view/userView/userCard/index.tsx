import React from 'react';
import { autorun } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';

import { getLocalStorageData, setLocalStorageData } from '../../../../modules'
import { getUser, deleteUser, putUser } from '../../../../api';

import { Form } from '../../../';

import { TChangeViewModal } from '../../../../store/mainStore/types';
import { TUser, IGetUser } from "../../../../api/types";


type TFetchUser = (id: number) => Promise<boolean | void>

interface IUserDetails {
	user: TUser
	errorUser: boolean
	fetchUser: TFetchUser
}
interface IUserCardProps {
	closeModal: TChangeViewModal
	mode: boolean
	getUsers: TUser[]
	setUsers: (users: TUser[])=>void
	id?: number
}

// в пропсы получает метод сворачивания модалки(она здесь 
// совсем простая, чтобы выносить её в отдельный компонент)
// и id юзера, которого надо запросить из апи.
// чтобы не нагружать приложение и ввиду дополнительного запроса
// к апи, было принято решение здесь создать локальный стор.

//================UPD 
//добавил возможность работы через localstorage(проп mode).
//методы работы с карточками так же зависят от мода

const UserCard:React.FC<IUserCardProps> = observer(({ closeModal, mode, getUsers, setUsers, id }):JSX.Element => {
	const userDetails = useLocalObservable(():IUserDetails =>({
		user: {},
		errorUser: false,
		async fetchUser(id:number):Promise<boolean | void>{
			if(!mode){ 
				const data: IGetUser= await getUser(id);
				if(data.err)return this.errorUser = true;
				this.user = data.user!;
			} else {
				getLocalStorageData().forEach(el=>{
					if(el.id === id)this.user = el as TUser;
				})
			}
		},
	}))

// хук для инициализаирующий юзера
	React.useEffect(()=>{
		id&&autorun(()=>userDetails.fetchUser(id))
	}, [])

// слушатель для модалки
	React.useEffect(()=>{
		document.addEventListener('click', closeModalWindow);
		
			return ()=> document.removeEventListener('click', closeModalWindow)
	})

// реф для модалки
	const modal:React.Ref<HTMLDivElement> = React.useRef(null);

// закрытие модалки
	const closeModalWindow = React.useCallback((e: MouseEvent):void => {
		e.preventDefault();
		const el = e.target;
		if(modal.current)(modal.current! as any).contains(el)&&closeModal();
	}, [modal.current])

// методы работы с апи/localstorage
	const onDelete = async(e: React.MouseEvent):Promise<void> => {
		e.preventDefault();
		if(window.confirm('a u sure?')){
			if(!mode){
				await deleteUser(userDetails.user.id!);
				setUsers(getUsers.filter(el=>el.id !==userDetails.user.id));	
			} else {
				const users:TUser[] = getLocalStorageData().filter(el=>el.id !==userDetails.user.id);
				setUsers(users);
			}
			closeModal();
		}
	}
	const saveUser = async(formData:TUser):Promise<void> => {
		!formData.id ? formData.id = Date.now() : formData.id = id;
		let arr: TUser[];
		if(!mode){
			arr = getUsers;
			await putUser(formData.id!, formData);
			if(!id){
				arr.push(formData);
			} else {
				getUsers.find((el, i)=>{
					if(el.id === id)arr.splice(i, 1, formData)
				})
			}		
		} else {
			arr = getLocalStorageData();
			if(!id){
				arr.push(formData);
			} else {
				arr.find((el, i)=>{
					if(el.id === id)arr.splice(i, 1, formData)
				})
			}
		}
		setUsers(arr);
		closeModal();
	}

  return(
		<>
			<figure className='card'>
				<span className='card__icon icon close-icon'
					onClick={()=>closeModal()}
				>x</span>
				<img 
					src={ userDetails.user.avatar || 'https://my-engine.ru/modules/users/avatar.png' } 
					width='128'
					height='128'
					alt='Sooo cute user' 
				/>
				<figcaption>
					<Form 
						onSubmit={ saveUser } 
						id='user' 
						classNameForm='card__form' 
						classNameSubmit='btn card__save-btn'
						prevData={ userDetails.user && userDetails.user! as Record<string, string | number>}
					>
						<input 
							name='first_name'
							form='user'
							placeholder={ (!id || userDetails.errorUser) ? 'firts__name' : userDetails.user.first_name }
							required
						/>
						<input 
							name='last_name'
							form='user'
							placeholder={ (!id || userDetails.errorUser) ? 'last__name' :  userDetails.user.last_name }
							required
						/>
						<input 
							name='email'
							form='user'
							placeholder={ (!id || userDetails.errorUser) ? 'email' : userDetails.user.email }
							required
						/>
					</Form>
				</figcaption>
				<button
					className='btn card__del-btn'
					onClick={ onDelete }
				>Delete</button>
			</figure>

			<div className='modal'
				ref={ modal }
			/>
		</>
	)
})

export { UserCard }