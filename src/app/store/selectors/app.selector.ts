import { createSelector, createFeatureSelector } from '@ngrx/store'
import { AppState } from '../reducers/app.reducer'

export const selectAppState = createFeatureSelector<AppState>('app')

export const selectAlert = createSelector(selectAppState, (state: AppState) => state?.alert)
export const selectAppLoading = createSelector(selectAppState, (state: AppState) => state.loading)
