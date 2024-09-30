import { createReducer, on } from '@ngrx/store'
import {addAlert, deleteAlert, setAppLoading} from '../actions/app.actions'
import { Notify } from '../../types/notification.models'

export interface AppState {
  alert: Notify | null,
  loading: boolean
}

export const initialState: AppState = {
  alert: null,
  loading: false
}

export const appReducer = createReducer(
  initialState,
  on(addAlert, (state, { severity, message }) => ({
    ...state,
    alert: { severity, message },
  })),
  on(deleteAlert, state => ({ ...state, alert: null })),
  on(setAppLoading, (state, {loading}) => ({ ...state, loading: loading }))
)
