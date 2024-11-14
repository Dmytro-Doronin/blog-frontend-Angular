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
  setUserLoading,
  successChangeUserData,
} from '../actions/auth.actions'
import { ConfirmationEmailTypes } from '../../types/auth.models'

export interface AuthState {
  alert: Notify | null
  isAuthLoading: boolean
  registrationEmail: string
  accessToken: string | null
  isAuthenticated: boolean
  confirmationStatus: ConfirmationEmailTypes
  userLoading: boolean
  user: {
    email: string
    login: string
    userId: string
    deviceId: string
    imageUrl: string
  }
}

export const initialState: AuthState = {
  isAuthLoading: false,
  registrationEmail: '',
  alert: null,
  confirmationStatus: null,
  accessToken: null,
  isAuthenticated: false,
  userLoading: false,
  user: {
    email: '',
    login: '',
    userId: '',
    deviceId: '',
    imageUrl: '',
  },
}

export const authReducer = createReducer(
  initialState,
  on(setIsAuthLoading, (state, { isAuthLoading }) => ({
    ...state,
    isAuthLoading: isAuthLoading,
  })),
  on(setProfile, (state, { email, login, userId, deviceId, imageUrl }) => ({
    ...state,
    user: { email, login, userId, deviceId, imageUrl },
  })),
  on(addAuthAlert, (state, { severity, message }) => ({
    ...state,
    alert: { severity, message },
  })),
  on(setUserLoading, (state, { userLoading }) => ({
    ...state,
    userLoading: userLoading,
  })),
  on(successChangeUserData, (state, { login, imageUrl }) => ({
    ...state,
    user: { ...state.user, login, imageUrl },
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
