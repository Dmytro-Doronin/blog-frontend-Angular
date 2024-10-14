import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BlogsState } from '../reducers/blogs.reducer'

export const selectBlogsState = createFeatureSelector<BlogsState>('blogs')

export const selectBlogsLoading = createSelector(
  selectBlogsState,
  (state: BlogsState) => state.loading
)
export const selectBlogs = createSelector(selectBlogsState, (state: BlogsState) => state.blogs)
export const selectHasMoreBlogs = createSelector(
  selectBlogsState,
  (state: BlogsState) => state.hasMoreBlogs
)
