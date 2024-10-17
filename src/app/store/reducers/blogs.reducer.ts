import { createReducer, on } from '@ngrx/store'

import {
  addBlogsToStateAction,
  callDeleteBlogModalAction,
  setAllBlogsToState,
  setBlogsLoadingAction, setCurrentBlogId,
  successDeleteBlog,
  successUpdateDetailsBlog,
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
  deleteBlogModal: boolean
  currentBlogId: string
}

export const initialState: BlogsState = {
  pagesCount: 0,
  page: 0,
  pageSize: 0,
  totalCount: 0,
  blogs: [],
  loading: false,
  hasMoreBlogs: false,
  deleteBlogModal: false,
  currentBlogId: ''
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

  on(successUpdateDetailsBlog, (state, { blog }) => ({
    ...state,
    blogs: state.blogs.map(b => (b.id === blog.id ? blog : b)),
  })),
  on(successDeleteBlog, (state, { blogId }) => ({
    ...state,
    blogs: state.blogs.filter(b => b.id !== blogId),
  })),

  on(callDeleteBlogModalAction, (state, { deleteBlogModal }) => ({
    ...state,
    deleteBlogModal: deleteBlogModal,
  })),

  on(setCurrentBlogId, (state, { blogId }) => ({
    ...state,
    currentBlogId: blogId,
  })),
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
