import React from 'react';

import { postUser } from '../../api'

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