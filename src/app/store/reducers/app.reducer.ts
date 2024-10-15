import { createReducer, on } from '@ngrx/store'
import { addAlert, deleteAlert, setAppLoading, setAutoLogOut } from '../actions/app.actions'
import { Notify } from '../../types/notification.models'

export interface AppState {
  alert: Notify | null
  loading: boolean
  autoLogOut: boolean
}

export const initialState: AppState = {
  alert: null,
  loading: false,
  autoLogOut: true,
}

export const appReducer = createReducer(
  initialState,
  on(addAlert, (state, { severity, message }) => ({
    ...state,
    alert: { severity, message },
  })),
  on(deleteAlert, state => ({ ...state, alert: null })),
  on(setAppLoading, (state, { loading }) => ({ ...state, loading: loading })),
  on(setAutoLogOut, (state, { autoLogOut }) => ({ ...state, autoLogOut: autoLogOut }))
)
