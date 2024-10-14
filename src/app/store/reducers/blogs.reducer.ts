import { createReducer, on } from '@ngrx/store'

import {
  addBlogsToStateAction,
  setAllBlogsToState,
  setBlogsLoadingAction,
} from '../actions/blogs.actions'
import { IBlog } from '../../types/blogs.models'

export interface BlogsState {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  blogs: IBlog[]
  loading: boolean
  hasMoreBlogs: boolean
}

export const initialState: BlogsState = {
  pagesCount: 0,
  page: 0,
  pageSize: 0,
  totalCount: 0,
  blogs: [],
  loading: false,
  hasMoreBlogs: false,
}

export const blogsReducer = createReducer(
  initialState,
  on(setBlogsLoadingAction, (state, { loading }) => ({ ...state, loading: loading })),
  on(
    setAllBlogsToState,
    (state, { blogs, pagesCount, page, pageSize, totalCount, hasMoreBlogs }) => ({
      ...state,
      blogs: blogs,
      pagesCount: pagesCount,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      hasMoreBlogs: hasMoreBlogs,
    })
  ),
  on(
    addBlogsToStateAction,
    (state, { blogs, pagesCount, page, pageSize, totalCount, hasMoreBlogs }) => ({
      ...state,
      blogs: [...state.blogs, ...blogs],
      pagesCount: pagesCount,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      hasMoreBlogs: hasMoreBlogs,
    })
  )
)
