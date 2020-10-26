import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import { getUser, deleteUser, putUser } from '../../api';

import { Form } from '../';

import { TChangeViewModal } from '../../store/mainStore/types';
import { TUser, IGetUser } from "../../api/types";
import { autorun } from 'mobx';

type TFetchUser = (id: number) => Promise<boolean | void>

interface IUserDetails {
	user: TUser
	errorUser: boolean
	fetchUser: TFetchUser
}
interface IUserCardProps {
	closeModal: TChangeViewModal
	id?: number
}

// в пропсы получает метод сворачивания модалки(она здесь 
// совсем простая, чтобы выносить её в отдельный компонент)
// и id юзера, которого надо запросить из апи.
// чтобы не нагружать приложение и ввиду дополнительного запроса
// к апи, было принято решение здесь создать локальный стор.

const UserCard:React.FC<IUserCardProps> = observer(({ closeModal, id }):JSX.Element => {
	const userDetails:IUserDetails = useLocalObservable(()=>({
		user: {},
		errorUser: false,
		async fetchUser(id:number):Promise<boolean | void>{
			const data:IGetUser = await getUser(id);
			if(data.err)return ;
			
			this.user = data.user!;
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

// методы работы с апи
	const onDelete = async(e: React.MouseEvent):Promise<void> => {
		e.preventDefault();
		if(window.confirm('a u sure?')){
			await deleteUser(userDetails.user.id!)
			closeModal();
		}
	}
	const saveUser = async(formData:Record<string, any>):Promise<void> => {
		await putUser(userDetails.user.id!, formData);
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
					>
						<input 
							name='first_name'
							form='user'
							defaultValue={ id ? userDetails.user.first_name : 'firts__name'}
							required
						/>
						<input 
							name='last_name'
							form='user'
							defaultValue={ id ? userDetails.user.last_name : 'last__name'}
							required
						/>
						<input 
							name='email'
							form='user'
							defaultValue={ id ? userDetails.user.email : 'email'}
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