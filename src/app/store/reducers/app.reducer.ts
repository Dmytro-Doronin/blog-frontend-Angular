import { createReducer, on } from '@ngrx/store'
import {
  addAlert,
  deleteAlert,
  setAppLoading,
  setAutoLogOut,
  setItemId,
} from '../actions/app.actions'
import { Notify } from '../../types/notification.models'

export interface AppState {
  alert: Notify | null
  loading: boolean
  autoLogOut: boolean
  itemId: string | null
}

export const initialState: AppState = {
  alert: null,
  loading: false,
  autoLogOut: false,
  itemId: null,
}

export const appReducer = createReducer(
  initialState,
  on(addAlert, (state, { severity, message }) => ({
    ...state,
    alert: { severity, message },
  })),
  on(setItemId, (state, { itemId }) => ({
    ...state,
    itemId: itemId,
  })),
  on(deleteAlert, state => ({ ...state, alert: null })),
  on(setAppLoading, (state, { loading }) => ({ ...state, loading: loading })),
  on(setAutoLogOut, (state, { autoLogOut }) => ({ ...state, autoLogOut: autoLogOut }))
)
