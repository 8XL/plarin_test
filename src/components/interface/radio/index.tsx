import React from 'react';
import { observer } from 'mobx-react-lite';

interface IPaginationProps {
	signs: string[]
	changeMode: ()=>void
}

const Radio:React.FC<IPaginationProps> = observer(({ signs, changeMode}):JSX.Element => {
	
  return(
    <div className='checkbox-wrapper'>
			<input className="checkbox" id="checkbox1" type="checkbox" onChange={()=>changeMode()}/>
			<label htmlFor="checkbox1" className="checkbox-label">
				<span className="on">{signs[0]}</span>
				<span className="off">{signs[1]}</span>
			</label>
		</div>
	)
})

export { Radio }