import { createAction, props } from '@ngrx/store/public_api'
import { Notify } from '../../types/notification.models'

export const addError = createAction('[Error] Add Error', props<Notify>())
export const deleteError = createAction('[Error] Delete Error')
