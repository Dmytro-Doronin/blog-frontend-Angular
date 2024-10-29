import { createFeatureSelector, createSelector } from '@ngrx/store'
import { PostsState } from '../reducers/posts.reduser'

export const selectPostsState = createFeatureSelector<PostsState>('posts')
export const selectPosts = createSelector(selectPostsState, (state: PostsState) => state.posts)
export const selectPostsLoading = createSelector(
  selectPostsState,
  (state: PostsState) => state.loading
)
export const selectHasMorePosts = createSelector(
  selectPostsState,
  (state: PostsState) => state.hasMorePosts
)
export const selectCurrentPostId = createSelector(
  selectPostsState,
  (state: PostsState) => state.currentPostId
)
export const selectDeletePostModal = createSelector(
  selectPostsState,
  (state: PostsState) => state.deletePostModal
)

export const selectSortParamsForPosts = createSelector(
  selectPostsState,
  (state: PostsState) => state
)
