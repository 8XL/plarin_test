import React from 'react';
import { observer } from 'mobx-react-lite';

import { rootStore } from '../../index';

interface IUserItemProps{
	first_name?: string,
	avatar?: string,
	id?: number
}

// компонеет маленькой карточки юзера
// в пропсы получает юзера
// заглушки в имени и аватаре на случай отсутсвия данных

const UserItem:React.FC<IUserItemProps> = observer(({ first_name, avatar, id }):JSX.Element => {
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
				{first_name || 'Unknown'}
			</figcaption>
		</figure>
	)
})

export { UserItem }