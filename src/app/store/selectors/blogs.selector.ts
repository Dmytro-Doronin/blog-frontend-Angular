import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BlogsState } from '../reducers/blogs.reducer'

export const selectBlogsState = createFeatureSelector<BlogsState>('blogs')

export const selectBlogsLoading = createSelector(
  selectBlogsState,
  (state: BlogsState) => state.loading
)

export const selectBlogForSearchLoading = createSelector(
  selectBlogsState,
  (state: BlogsState) => state.blogsForSearchLoading
)
export const selectBlogs = createSelector(selectBlogsState, (state: BlogsState) => state.blogs)
export const selectCurrentBlogId = createSelector(
  selectBlogsState,
  (state: BlogsState) => state.currentBlogId
)
export const selectDeleteBlogModal = createSelector(
  selectBlogsState,
  (state: BlogsState) => state.deleteBlogModal
)
export const selectHasMoreBlogs = createSelector(
  selectBlogsState,
  (state: BlogsState) => state.hasMoreBlogs
)
export const selectSearchBlogs = createSelector(
  selectBlogsState,
  (state: BlogsState) => state.blogsForSearch
)
export const selectSortParams = createSelector(selectBlogsState, (state: BlogsState) => state)

export const selectBlogById = (blogId: string | null) =>
  createSelector(selectBlogs, blogs => blogs.find(blog => blog.id === blogId))
