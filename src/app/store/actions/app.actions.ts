import { createAction, props } from '@ngrx/store'
import { Notify } from '../../types/notification.models'
import { AuthRegistration } from '../../types/auth.models'

export const registerUser = createAction('[Auth] Register User', props<AuthRegistration>())
export const addAlert = createAction('[Error] Add Error', props<Notify>())
export const deleteAlert = createAction('[Error] Delete Error')
