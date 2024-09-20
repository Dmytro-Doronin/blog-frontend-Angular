import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthState } from '../reducers/auth.reducer'
import {setLoginLoading} from "../actions/auth.actions";

export const selectAuthState = createFeatureSelector<AuthState>('auth')

export const selectAuthAlert = createSelector(selectAuthState, (state: AuthState) => state?.alert)

export const selectRegistrationLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.registrationLoading
)
export const selectAccessToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.registrationLoading
)

export const selectLoginLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginLoading
)

export const selectRecoveryLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.passwordRecoveryLoading
)

export const selectNewPasswordLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.newPasswordLoading
)
