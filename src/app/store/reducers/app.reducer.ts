import { createReducer, on } from '@ngrx/store'
import { addAlert, deleteAlert } from '../actions/app.actions'
import { Notify } from '../../types/notification.models'

export interface AppState {
  error: Notify | null
}

export const initialState: AppState = {
  error: null,
}

export const appReducer = createReducer(
  initialState,
  on(addAlert, (state, { severity, message }) => ({
    ...state,
    error: { severity, message },
  })),
  on(deleteAlert, state => ({ ...state, error: null }))
)
