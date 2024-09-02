import { createAction, props } from '@ngrx/store/public_api'

export const addError = createAction('[Error] Add Error', props<{ error: string }>())
export const deleteError = createAction('[Error] Delete Error')
