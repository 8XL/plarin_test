import React from 'react';
import { observer } from 'mobx-react-lite';

import { TUser } from '../../../../api/types';
import { UserItem } from '..';

interface IUserListProps{
  users: TUser[]
}

//получает массив объектов 
//саспенс на случай большого массива данных

const UserList:React.FC<IUserListProps> = observer(({ users }):JSX.Element => {
  return(
    <div className='users'  >
      <React.Suspense fallback={<div>Загрузка...</div>}>
        {
          users.map((user:TUser)=>(
            <UserItem {...user} key={user.id} />
          ))
        }
      </React.Suspense>
    </div>
	)
})

export { UserList }