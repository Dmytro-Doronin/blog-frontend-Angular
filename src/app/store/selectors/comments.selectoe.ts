import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CommentsState } from '../reducers/comments.reducer'

export const selectCommentsState = createFeatureSelector<CommentsState>('comments')
export const selectCommentsLoading = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.loading
)
