import React from "react";
import { createPortal } from "react-dom";

import { TChangeViewModal } from '../../../store/mainStore/types';

const Portal: React.FC = ({ children }) => {
	const mount = document.getElementById('portal');
	const el = document.createElement('div');
	el.className = 'modal'

	React.useEffect(()=>{
		mount!.appendChild(el);
		
			return ()=>{ mount!.removeChild(el)}
	}, [el, mount])
	
	return createPortal(children, el)
}


interface IModalProps {
	closeModal: TChangeViewModal
}

const Modal: React.FC<IModalProps> = ({ closeModal, children }): JSX.Element => {
	React.useEffect(()=>{
		document.addEventListener('click', closeModalWindow);
		
			return ()=> document.removeEventListener('click', closeModalWindow)
	})

// реф для модалки
	const modal:React.Ref<HTMLDivElement> = React.useRef(null);

// закрытие модалки
	const closeModalWindow = React.useCallback((e: MouseEvent):void => {
		e.preventDefault();
		const el = e.target;
		if(modal.current){
			!(modal.current! as any).contains(el)&&closeModal()
		};
	}, [modal.current])

	return(
		<Portal>
			<div
					ref={ modal }
			>
				{ children }
			</div>
		</Portal>
	)
}

export { Modal }