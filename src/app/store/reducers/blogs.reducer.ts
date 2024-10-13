import { createReducer, on } from '@ngrx/store'

import { setBlogsLoadingAction } from '../actions/blogs.actions'

export interface BlogsState {
  loading: boolean
}

export const initialState: BlogsState = {
  loading: false,
}

export const blogsReducer = createReducer(
  initialState,
  on(setBlogsLoadingAction, (state, { loading }) => ({ ...state, loading: loading }))
)
