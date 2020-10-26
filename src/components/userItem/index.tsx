import React from 'react';
import { observer } from 'mobx-react-lite';

import { TChangeViewModal } from '../../store/mainStore/types';
import { rootStore } from '../../index';
interface IUserItemProps{
	name?: string,
	avatar?: string,
	id?: number
}

const UserItem:React.FC<IUserItemProps> = observer(({ name, avatar, id }):JSX.Element => {
	const { mainStore } = React.useContext(rootStore);
  return(
		<figure className='user users__item' onClick={()=>mainStore.changeViewModal(id)}>
			<img 
				className='user__image'
				src={ avatar || 'https://my-engine.ru/modules/users/avatar.png' } 
				width='128'
				height='128'
				alt='Sooo cute user' 
			/>
			<figcaption className='user__title'>
				{name || 'Unknown'}
			</figcaption>
		</figure>
	)
})

export { UserItem }