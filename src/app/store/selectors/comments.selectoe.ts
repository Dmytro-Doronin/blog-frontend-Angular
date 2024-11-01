import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CommentsState } from '../reducers/comments.reducer'

export const selectCommentsState = createFeatureSelector<CommentsState>('comments')
export const selectCommentsLoading = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.loading
)
export const selectTotalCountComments = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.totalCount
)
export const selectComments = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.comments
)
export const selectHasMoComment = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.hasMoreComments
)
