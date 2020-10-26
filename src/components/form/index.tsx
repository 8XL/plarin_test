import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

interface IForm {
	data: Record<string, string|number>
	changeData: (e: React.FormEvent) => void
	submitData: (e: React.FormEvent)=>void
	clearData: ()=>void
}
interface IFormProps {
	onSubmit: (formData: Record<string, any>) => void
	id: string
	className: string
}

const Form:React.FC<IFormProps> = observer(({ onSubmit, id, className, children }):JSX.Element => {
	const form: IForm = useLocalObservable(()=>({
		data: {},
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

	return(
		<form 
			className={className}
			id={ id }
			onSubmit={ form.submitData }
			onChange={ form.changeData }
		>
			{ children }
		</form>
	)
})

export { Form }