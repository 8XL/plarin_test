import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

interface IForm {
	data: Record<string, string|number>
	setData: <T>(prevData: T) => void
	changeData: (e: React.FormEvent) => void
	submitData: (e: React.FormEvent)=>void
	clearData: ()=>void
}
interface IFormProps {
	onSubmit: (formData: Record<string, any>) => void
	id: string
	classNameForm: string
	classNameSubmit: string
	submitValue?: string
	prevData?: Record<string, string | number>
}

//Компонент формы универсален и реиспользуемый за счет локального стора. 
//В пропсы получает метод сабмита, id формы(для связки формы с инпутами),
// класс и элементы композиции

const Form:React.FC<IFormProps> = observer(({ onSubmit, id, classNameForm, classNameSubmit, submitValue, children, prevData }):JSX.Element => {
	const form: IForm = useLocalObservable(()=>({
		data: {},
		setData<T>(prevData: T) {
			this.data = prevData
		},
		changeData(e: React.FormEvent):void {
			const target = e.target as HTMLInputElement;
			const name = target.name;
			const value = target.value;

			this.data = {
				...this.data,
				[name]: value
			}
		},
		submitData(e: React.FormEvent):void {
			e.preventDefault();
			onSubmit(this.data);
			this.clearData();
		},
		clearData():void{
			this.data = {}
		}
	}))

	React.useEffect(()=>{
		prevData&&form.setData(prevData)
	},[prevData])

	return(
		<form 
			className={classNameForm}
			id={ id }
			onSubmit={ (Object.values(form.data).length>0) ? form.submitData : ()=>alert('Enter anything!')}
			onChange={ form.changeData }
		>
			{ children }
			<button
				onClick={ (Object.values(form.data).length>0) ? form.submitData : ()=>alert('Enter anything!') }
				className={classNameSubmit}
				type='submit'
				form={id}
			>{submitValue || 'Submit'}</button>
		</form>
	)
})

export { Form }