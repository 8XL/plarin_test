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
	id: number
}

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
	React.useEffect(()=>{
		autorun(()=>userDetails.fetchUser(id))
	}, [])
	React.useEffect(()=>{
		document.addEventListener('click', closeModalWindow);
		
			return ()=> document.removeEventListener('click', closeModalWindow)
	})

	const modal:React.Ref<HTMLDivElement> = React.useRef(null);

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
	const closeModalWindow = React.useCallback((e: MouseEvent):void => {
		const el = e.target;
		if(modal.current)(modal.current! as any).contains(el)&&closeModal();
	}, [modal.current])

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
					<Form onSubmit={ saveUser } id='user' className='card__form'>
						<input 
							name='first_name'
							form='user'
							defaultValue={userDetails.user.first_name}
						/>
						<input 
							name='last_name'
							form='user'
							defaultValue={ userDetails.user.last_name }
						/>
						<input 
							name='email'
							form='user'
							defaultValue={ userDetails.user.email }
						/>
					</Form>
				</figcaption>
				<button
					className='btn card__del-btn'
					onClick={ onDelete }
				>Delete</button>
				<button
					className='btn card__save-btn'
					type='submit'
					form='user'
				>Save</button>
			</figure>

			<div className='modal'
				ref={ modal }
			>
			</div>
		</>
	)
})

export { UserCard }