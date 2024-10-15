import { createSelector, createFeatureSelector } from '@ngrx/store'
import { AppState } from '../reducers/app.reducer'

export const selectAppState = createFeatureSelector<AppState>('app')

export const selectAppAlert = createSelector(selectAppState, (state: AppState) => state.alert)
export const selectAppLoading = createSelector(selectAppState, (state: AppState) => state.loading)
export const selectAutoLogOut = createSelector(
  selectAppState,
  (state: AppState) => state.autoLogOut
)
