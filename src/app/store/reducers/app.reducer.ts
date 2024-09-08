import { createReducer, on } from '@ngrx/store'
import { addError, deleteError } from '../actions/app.actions'

export interface AppState {
  error: string | null
}

export const initialState: AppState = {
  error: null,
}

export const appReducer = createReducer(
  initialState,
  on(addError, (state, { error }) => ({
    ...state,
    error,
  })),
  on(deleteError, state => ({ ...state, error: '' }))
)
