import React from 'react';
import { observer } from 'mobx-react-lite';

interface IPaginationProps {
	signs: string[]
	checked: boolean
	changeMode: ()=>void
}

const Radio:React.FC<IPaginationProps> = observer(({ signs, checked, changeMode}):JSX.Element => {
	
  return(
    <div className='panel__checkbox'>
			<input 
				className="checkbox" 
				id="checkbox1" 
				type="checkbox" 
				checked={ checked }
				onChange={()=>changeMode()}
			/>
			<label htmlFor="checkbox1" className="checkbox-label">
				<span className="on">{signs[0]}</span>
				<span className="off">{signs[1]}</span>
			</label>
		</div>
	)
})

export { Radio }