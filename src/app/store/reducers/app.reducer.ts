import { createReducer, on } from '@ngrx/store'
import { addError, deleteError } from '../actions/app.actions'
import { state } from '@angular/animations'

export interface AppState {
  error: string
}

export const initialState: AppState = {
  error: '',
}

export const appReducer = createReducer(
  initialState,
  on(addError, (state, { error }) => ({
    ...state,
    error,
  })),
  on(deleteError, state => ({ ...state, error: '' }))
)
