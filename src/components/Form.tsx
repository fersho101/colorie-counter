import { useState, ChangeEvent, FormEvent, Dispatch } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Activity } from '../types'
import { categories } from '../data/categories'
import { ActivityActions } from '../reducers/activity-reducer'

type FormsProps = {
	dispatch: Dispatch<ActivityActions>
}

const initialState: Activity = {
	id: uuidv4(),
	category: 1,
	name: '',
	calories: 0,
}

export default function Form({ dispatch }: FormsProps) {
	const [activity, setActivity] = useState<Activity>(initialState)

	const handleChange = (
		e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
	) => {
		const isNumberField = ['category', 'calories'].includes(e.target.id)

		setActivity({
			...activity,
			[e.target.id]: isNumberField ? +e.target.value : e.target.value,
		})
	}

	const isValidActivity = () => {
		const { name, calories } = activity
		return name.trim() !== '' && calories > 0
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		dispatch({ type: 'save-activity', payload: { newActivity: activity } })
		setActivity({
			...initialState,
			id: uuidv4(),
		})
	}

	return (
		<form
			className=' space-y-5 bg-white shadow p-10 rounded-lg'
			onSubmit={handleSubmit}
		>
			<div className=' grid grid-cols-1 gap-3'>
				<label
					htmlFor='category'
					className='font-bold'
				>
					Categoria:
				</label>
				<select
					className='border border-slate-300 p-2 rounded-lg w-full bg-white'
					name=''
					id='category'
					value={activity.category}
					onChange={handleChange}
				>
					{categories.map(category => (
						<option
							value={category.id}
							key={category.id}
						>
							{category.name}
						</option>
					))}
				</select>
			</div>
			<div className='grid grid-cols-1 gap-3'>
				<label
					htmlFor='name'
					className='font-bold'
				>
					Actividad:
				</label>
				<input
					type='text'
					id='name'
					className='border border-slate-300 p-2 rounded-lg'
					placeholder='Ej. Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicleta'
					value={activity.name}
					onChange={handleChange}
				/>
			</div>
			<div className='grid grid-cols-1 gap-3'>
				<label
					htmlFor='calories'
					className='font-bold'
				>
					Calorias:
				</label>
				<input
					type='number'
					id='calories'
					className='border border-slate-300 p-2 rounded-lg'
					placeholder='Calorias Ej. 300, 500.'
					value={activity.calories}
					onChange={handleChange}
				/>
			</div>
			<input
				type='submit'
				className='bg-gray-900 hover:bg-gray-600 w-full font-bold uppercase text-white cursor-pointer disabled:opacity-10 py-2 rounded-md'
				value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
				disabled={!isValidActivity()}
			/>
		</form>
	)
}
