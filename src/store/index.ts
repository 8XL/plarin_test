import mainStore from './mainStore';
import { IMainStore } from './mainStore/types'

interface IStore {
	mainStore: IMainStore
}

const store:IStore = {
	mainStore
}

export { store }