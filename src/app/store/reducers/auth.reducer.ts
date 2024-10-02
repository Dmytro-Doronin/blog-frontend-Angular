import { createReducer, on } from '@ngrx/store'
import { Notify } from '../../types/notification.models'
import {
  addAuthAlert,
  authMe,
  deleteAuthAlert,
  setAccessToken,
  setConfirmationEmailStatus,
  setIsAuthenticated,
  setLoginLoading,
  setNewPasswordLoading,
  setPasswordRecoveryLoading,
  setProfile,
  setRegistrationLoading,
} from '../actions/auth.actions'
import { ConfirmationEmailTypes } from '../../types/auth.models'

export interface AuthState {
  alert: Notify | null
  registrationLoading: boolean
  loginLoading: boolean
  accessToken: string | null
  isAuthenticated: boolean
  confirmationStatus: ConfirmationEmailTypes
  user: {
    email: string
    login: string
    userId: string
  }
  passwordRecoveryLoading: boolean
  newPasswordLoading: boolean
}

export const initialState: AuthState = {
  registrationLoading: false,
  passwordRecoveryLoading: false,
  newPasswordLoading: false,
  loginLoading: false,
  alert: null,
  confirmationStatus: null,
  accessToken: null,
  isAuthenticated: false,
  user: {
    email: '',
    login: '',
    userId: '',
  },
}

export const authReducer = createReducer(
  initialState,
  on(setProfile, (state, { email, login, userId }) => ({
    ...state,
    user: { email, login, userId },
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
  on(setRegistrationLoading, (state, { registrationLoading }) => ({
    ...state,
    registrationLoading: registrationLoading,
  })),
  on(setLoginLoading, (state, { loginLoading }) => ({
    ...state,
    loginLoading: loginLoading,
  })),
  on(setNewPasswordLoading, (state, { newPasswordLoading }) => ({
    ...state,
    newPasswordLoading: newPasswordLoading,
  })),

  on(setPasswordRecoveryLoading, (state, { passwordRecoveryLoading }) => ({
    ...state,
    passwordRecoveryLoading: passwordRecoveryLoading,
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
