import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CommentsState } from '../reducers/comments.reducer'

export const selectCommentsState = createFeatureSelector<CommentsState>('comments')
export const selectCommentsLoading = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.loading
)
export const selectMoreCommentsLoading = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.loadingMoreComments
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
export const selectEditCommentIdComment = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.editCommentId
)

export const selectEditCommentLoading = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.editLoading
)
export const selectCommentById = (commentId: string | null) =>
  createSelector(selectComments, comments => comments.find(comment => comment.id === commentId))
