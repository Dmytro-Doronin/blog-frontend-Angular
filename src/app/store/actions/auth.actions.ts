import { createAction, props } from '@ngrx/store'
import { AuthRegistration } from '../../types/auth.models'
import { Notify } from '../../types/notification.models'

export const registerUser = createAction('[Auth] Register User', props<AuthRegistration>())
export const addAuthAlert = createAction('[Alert] Add Alert', props<Notify>())
export const deleteAuthAlert = createAction('[Alert] Delete Alert')

export const setRegistrationLoading = createAction(
  '[Registration loader] Set registration loader',
  props<{ registrationLoading: boolean }>()
)
