import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "../reducers/app.reducer";
import {AuthState} from "../reducers/auth.reducer";
import {setRegistrationLoading} from "../actions/auth.actions";

export const selectAuthState = createFeatureSelector<AuthState>('auth')

export const selectAuthAlert = createSelector(
  selectAuthState,
  (state: AuthState) => state?.alert
)

export const selectRegistrationLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.registrationLoading
)
