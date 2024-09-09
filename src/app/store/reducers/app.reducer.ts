import { createReducer, on } from '@ngrx/store'
import { addError, deleteError } from '../actions/app.actions'
import { Notify } from '../../types/notification.models'

export interface AppState {
  error: Notify | null
}

export const initialState: AppState = {
  error: null,
}

export const appReducer = createReducer(
  initialState,
  on(addError, (state, error) => ({
    ...state,
    error: { severity: error.severity, message: error.message },
  })),
  on(deleteError, state => ({ ...state, error: null }))
)
