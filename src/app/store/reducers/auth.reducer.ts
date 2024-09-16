import { createReducer, on } from '@ngrx/store'
import { Notify } from '../../types/notification.models'
import { addAuthAlert, deleteAuthAlert, setRegistrationLoading } from '../actions/auth.actions'

export interface AuthState {
  alert: Notify | null
  registrationLoading: boolean
  loginLoading: boolean
  accessToken: string | null
  isAuthenticated: boolean
}

export const initialState: AuthState = {
  registrationLoading: false,
  loginLoading: false,
  alert: null,
  accessToken: null,
  isAuthenticated: false,
}

export const authReducer = createReducer(
  initialState,
  on(addAuthAlert, (state, { severity, message }) => ({
    ...state,
    alert: { severity, message },
  })),
  on(deleteAuthAlert, state => ({ ...state, alert: null })),
  on(setRegistrationLoading, (state, { registrationLoading }) => ({
    ...state,
    registrationLoading: registrationLoading,
  }))
)
