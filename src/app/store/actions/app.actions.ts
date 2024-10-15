import { createAction, props } from '@ngrx/store'
import { Notify } from '../../types/notification.models'

export const addAlert = createAction('[App alert] Add app alert', props<Notify>())
export const deleteAlert = createAction('[Error] Delete Error')
export const setAppLoading = createAction('[Error] Delete Error', props<{ loading: boolean }>())
export const setAutoLogOut = createAction('[Error] Delete Error', props<{ autoLogOut: boolean }>())
