import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import { rootStore } from '../../../../index';

interface IUserItemProps{
	first_name?: string,
	avatar?: string,
	id?: number,
	changed?: boolean
}

// компонеет маленькой карточки юзера
// в пропсы получает юзера
// заглушки в имени и аватаре на случай отсутсвия данных

const UserItem:React.FC<IUserItemProps> = observer(({ first_name, avatar, id, changed }):JSX.Element => {
	const { mainStore } = React.useContext(rootStore);

	const axises = useLocalObservable(()=>({
		xAxis: 0,
		yAxis: 0,

		setAxises(e: MouseEvent){
			e.preventDefault();
			this.xAxis = -(window.innerWidth / 2 - e.pageX) / 15;
			this.yAxis = (window.innerHeight / 2 - e.pageY) / 15;
		},
	}))

	React.useEffect(()=>{
		document.body.addEventListener('mousemove', e=>axises.setAxises(e))

		return ()=> document.body.removeEventListener('mousemove', e=>axises.setAxises(e))
	}, [])

  return(
		<figure 
			className={`user users__item ${changed && 'changed'}`}
			style={{ 
				transform: `rotateX(${axises.yAxis}deg) rotateY(${axises.xAxis}deg)`,
				transition: 'all 0.25s ease'
			}} 
			onClick={()=>mainStore.changeViewModal(id)}
		>
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