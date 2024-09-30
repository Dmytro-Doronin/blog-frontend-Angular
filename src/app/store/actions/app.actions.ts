import { createAction, props } from '@ngrx/store'
import { Notify } from '../../types/notification.models'
import { AuthRegistration } from '../../types/auth.models'

export const addAlert = createAction('[Error] Add Error', props<Notify>())
export const deleteAlert = createAction('[Error] Delete Error')
export const setAppLoading = createAction('[Error] Delete Error', props<{loading: boolean}>())
