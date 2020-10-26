import React from 'react';

import { postUser } from '../../api'

// здесь все совсем просто: импорт метода работы с апи
// и отправка заглушки. формы для создания нового юзера
// в задании не было

const UserAdder:React.FC = ():JSX.Element => {
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
      onClick={ postNewUser }
    >
      <span className='plus__icon'>
        +
      </span>
    </div>
	)
}

export { UserAdder }