import { createReducer, on } from '@ngrx/store'
import { Notify } from '../../types/notification.models'
import {
  addAuthAlert,
  deleteAuthAlert,
  setAccessToken,
  setConfirmationEmailStatus,
  setIsAuthenticated,
  setIsAuthLoading,
  setProfile,
  setRegistrationEmail,
} from '../actions/auth.actions'
import { ConfirmationEmailTypes } from '../../types/auth.models'

export interface AuthState {
  alert: Notify | null
  isAuthLoading: boolean
  registrationEmail: string
  accessToken: string | null
  isAuthenticated: boolean
  confirmationStatus: ConfirmationEmailTypes
  user: {
    email: string
    login: string
    userId: string
    deviceId: string
  }
}

export const initialState: AuthState = {
  isAuthLoading: false,
  registrationEmail: '',
  alert: null,
  confirmationStatus: null,
  accessToken: null,
  isAuthenticated: false,
  user: {
    email: '',
    login: '',
    userId: '',
    deviceId: ''
  },
}

export const authReducer = createReducer(
  initialState,
  on(setIsAuthLoading, (state, { isAuthLoading }) => ({
    ...state,
    isAuthLoading: isAuthLoading,
  })),
  on(setProfile, (state, { email, login, userId, deviceId }) => ({
    ...state,
    user: { email, login, userId, deviceId },
  })),
  on(addAuthAlert, (state, { severity, message }) => ({
    ...state,
    alert: { severity, message },
  })),
  on(setConfirmationEmailStatus, (state, { confirmationStatus }) => ({
    ...state,
    confirmationStatus: confirmationStatus,
  })),
  on(deleteAuthAlert, state => ({ ...state, alert: null })),
  on(setRegistrationEmail, (state, { registrationEmail }) => ({
    ...state,
    registrationEmail: registrationEmail,
  })),
  on(setAccessToken, (state, { accessToken }) => ({
    ...state,
    accessToken: accessToken,
  })),
  on(setIsAuthenticated, (state, { isAuthenticated }) => ({
    ...state,
    isAuthenticated: isAuthenticated,
  }))
)
