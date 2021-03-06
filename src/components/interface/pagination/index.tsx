import React from 'react';
import { observer } from 'mobx-react-lite';

interface IPaginationProps {
	value: number
	changePage: (num: number)=> void
}

// Здесь я не совсем понял логику пагинации в тестовом,
// количество страниц берется из заглушки в сторе,
// других вариантов я не нашел

const Pagination:React.FC<IPaginationProps> = observer(({ value, changePage }):JSX.Element => {
	const nums:number[] = [];
	for(let i = 1; i<=value; i++){
		nums.push(i)
	};
  return(
    <div className='pagination'>
			<ul className='pagination__list'>
				{
					nums.map((num:number)=>
						<li 
							className='pagination__item'
							onClick={()=>changePage(num)}
							key={ num }
						>
							{ num }
						</li>
					)
				}
			</ul>
    </div>
	)
})

export { Pagination }