import React from 'react';
import { observer } from 'mobx-react-lite';

import { rootStore } from './';
import { UserList, Pagination, UserCard, UserAdder, Radio, Modal } from './components';
import { saveChanges } from './api'

//если работается через апи напрямую, то запросы так же отправляются сразу к апи
//если выбран localstorage, то сначала сохраняем все изменения в локальный стор,
//по окончанию выполняем отправку (кнопка save changes) >>> метод 
//просто перебирает локальныйстор и отправляет их на апи PUT-запросом
//и обновляет страницу для обновления 

//при работе через локальный стор стор приложения обновляется и изменения сразу
//отражаются в интерфейсе. через апи - нет(ну, тут апи статичный)
export const App:React.FC = observer(():JSX.Element => {

  const store = React.useContext(rootStore);
  return (
    <div className='container'>
      <main>
        <section className='users-wrapper'>
          <div className='panel'>
            <Radio 
              signs={ ['LocalStorage mode', 'API mode'] } 
              checked={ store.mainStore.getWorkMode }
              changeMode={ ()=>store.mainStore.toggleWorkMode() } 
            />
            {
              (store.mainStore.getWorkMode && store.mainStore.getFlagChanged)
              && <button 
                className='btn default-btn panel__btn'
                onClick={ saveChanges }
              >Save changes</button>
            }
          </div>
            {
              !store.mainStore.getUsersError ? 
              (
                <>
                  <UserList 
                    users={store.mainStore.getUsers} 
                  />
                  <UserAdder 
                    openModal={store.mainStore.changeViewModal} 
                  />
                  <Pagination 
                    value={store.mainStore.getPagination} 
                    changePage={store.mainStore.fetchUsers} 
                  />
                </>
              ) : (
                <div className='users__error'>
                  Oops, we have some problems...
                </div>
              )
            }
        </section>

        {
        store.mainStore.getModalView &&
          <Modal closeModal={ store.mainStore.changeViewModal }>
            <UserCard 
              closeModal={ store.mainStore.changeViewModal }
              mode={ store.mainStore.getWorkMode }
              getUsers={ store.mainStore.getUsers }
              setUsers={ store.mainStore.setUsers }
              id={ store.mainStore.getModalId }
            />
          </Modal>
        }

      </main>
    </div>
  );
})
