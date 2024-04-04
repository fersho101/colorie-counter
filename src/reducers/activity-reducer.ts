import { Activity } from '../types'

export type ActivityActions = {
	type: 'sava-activity'
	payload: { newActivity: Activity }
}

type ActivityState = {
	activities: Activity[]
}
export const initialState: ActivityState = {
	activities: [],
}

export const activityReducer = (
	state: ActivityState = initialState,
	action: ActivityActions
) => {}
