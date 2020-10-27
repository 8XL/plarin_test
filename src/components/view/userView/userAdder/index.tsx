import React from 'react';

import { TChangeViewModal } from '../../../../store/mainStore/types';
import { postUser } from '../../../../api'
import { observer } from 'mobx-react-lite';

// здесь все совсем просто: открываем пустую модалку

interface IUserAdderProps {
	openModal: TChangeViewModal
}
const UserAdder:React.FC<IUserAdderProps> = observer(({ openModal }):JSX.Element => {
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