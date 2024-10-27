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

export const selectSortParamsForPosts = createSelector(
  selectPostsState,
  (state: PostsState) => state
)
