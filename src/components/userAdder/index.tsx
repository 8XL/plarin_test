import React from 'react';

import { TChangeViewModal } from '../../store/mainStore/types';
import { postUser } from '../../api'
import { observer } from 'mobx-react-lite';

// здесь все совсем просто: импорт метода работы с апи
// и отправка заглушки. формы для создания нового юзера
// в задании не было

interface IUserAdderProps {
	openModal: TChangeViewModal
}
const UserAdder:React.FC<IUserAdderProps> = observer(({ openModal }):JSX.Element => {
  const postNewUser = (e: React.MouseEvent): void =>{
    e.preventDefault();
    const user = {
      first_name: 'aaaa',
      last_name: 'asasas',
      id: Date.now(),
      email: 'asdasdasdasd@mail.com'
    };
    postUser(user);
  }
  return(
    <div className='plus users__item'
      onClick={ ()=>openModal() }
    >
      <span className='plus__icon'>
        +
      </span>
    </div>
	)
})

export { UserAdder }