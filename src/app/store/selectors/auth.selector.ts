import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthState } from '../reducers/auth.reducer'

export const selectAuthState = createFeatureSelector<AuthState>('auth')

export const selectAuthAlert = createSelector(selectAuthState, (state: AuthState) => state.alert)
export const selectAuthAlertSeverity = createSelector(
  selectAuthState,
  (state: AuthState) => state.alert?.severity
)

export const selectIsAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthLoading
)

export const selectConfirmationStatus = createSelector(
  selectAuthState,
  (state: AuthState) => state.confirmationStatus
)

export const selectRegistrationEmail = createSelector(
  selectAuthState,
  (state: AuthState) => state.registrationEmail
)

export const selectAccessToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.accessToken
)

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
)

export const selectUserLogin = createSelector(
  selectAuthState,
  (state: AuthState) => state.user.login
)
export const selectUserImage = createSelector(
  selectAuthState,
  (state: AuthState) => state.user.imageUrl
)

export const selectUserData = createSelector(selectAuthState, (state: AuthState) => state.user)
export const selectUserId = createSelector(selectAuthState, (state: AuthState) => state.user.userId)
export const selectUserLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.userLoading
)
export const selectDeviceId = createSelector(
  selectAuthState,
  (state: AuthState) => state.user.deviceId
)
