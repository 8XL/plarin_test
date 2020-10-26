import React from 'react';
import { observer } from 'mobx-react-lite';

import { TUser } from '../../api/types';
import { UserItem } from '../';

interface IUserListProps{
  users: TUser[]
}

const UserList:React.FC<IUserListProps> = observer(({ users }):JSX.Element => {
  return(
    <div className='users'  >
      <React.Suspense fallback={<div>Загрузка...</div>}>
        {
          users.map((user:TUser)=>(
            <UserItem name={user.first_name} avatar={user.avatar} id={user.id} key={user.id} />
          ))
        }
      </React.Suspense>
    </div>
	)
})

export { UserList }