import { createFeatureSelector, createSelector } from '@ngrx/store'
import { PostsState } from '../reducers/posts.reduser'
import { selectBlogs } from './blogs.selector'

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
export const selectPostById = (postId: string | null) =>
  createSelector(selectPosts, posts => posts.find(blog => blog.id === postId))
