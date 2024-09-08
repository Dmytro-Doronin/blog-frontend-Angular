import { createSelector, createFeatureSelector } from '@ngrx/store'
import { AppState } from '../reducers/app.reducer'

export const selectAppState = createFeatureSelector<AppState>('app')

export const selectError = createSelector(selectAppState, (state: AppState) => state.error)
