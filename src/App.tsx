import React from 'react';
import { observer } from 'mobx-react-lite';

import { rootStore } from './';
import { UserList, Pagination, UserCard, UserAdder } from './components';

export const App:React.FC = observer(():JSX.Element => {

  const store = React.useContext(rootStore);

  return (
    <div className='container'>
      <main>
        <section className='users-wrapper'>
            <UserList users={store.mainStore.getUsers} />
            <UserAdder openModal={store.mainStore.changeViewModal} />
            <Pagination value={store.mainStore.getPagination} changePage={store.mainStore.fetchUsers} />
        </section>

        {
        store.mainStore.getModalView
          &&<UserCard 
              closeModal={store.mainStore.changeViewModal} 
              id={store.mainStore.getModalId}
            />
        }

      </main>
    </div>
  );
})
