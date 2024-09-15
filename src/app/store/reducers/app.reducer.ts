import { createReducer, on } from '@ngrx/store'
import { addAlert, deleteAlert } from '../actions/app.actions'
import { Notify } from '../../types/notification.models'

export interface AppState {
  alert: Notify | null
}

export const initialState: AppState = {
  alert: null,
}

export const appReducer = createReducer(
  initialState,
  on(addAlert, (state, { severity, message }) => ({
    ...state,
    alert: { severity, message },
  })),
  on(deleteAlert, state => ({ ...state, alert: null }))
)
