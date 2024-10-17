import { createAction, props } from '@ngrx/store'
import { BlogQueryParams, IBlog, PostBlogModel } from '../../types/blogs.models'

export const addBlogsAction = createAction('[Add blog] add blog', props<PostBlogModel>())

export const loadBlogs = createAction('[Blog] get all blogs', props<{ params: BlogQueryParams }>())
export const updateBlog = createAction(
  '[Blog] Update Blog',
  props<{
    blogId: string
    name: string
    description: string
    websiteUrl: string
  }>()
)

export const deleteBlog = createAction('[Blog] delete blog', props<{ blogId: string }>())
export const setCurrentBlogId = createAction('[Blog] set current blog id', props<{ blogId: string }>())

export const successDeleteBlog = createAction('[Blog] success delete blog', props<{ blogId: string }>())
export const successUpdateDetailsBlog = createAction(
  '[Blog] Update Blog details',
  props<{ blog: IBlog }>()
)

export const setAllBlogsToState = createAction(
  '[Blog] Set all blogs to state',
  props<{
    blogs: IBlog[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMoreBlogs: boolean
  }>()
)

export const addBlogsToStateAction = createAction(
  '[Blogs] set all blogs at first load blogs',
  props<{
    blogs: IBlog[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMoreBlogs: boolean
  }>()
)

export const setBlogsLoadingAction = createAction(
  '[Blog] set blog loading',
  props<{ loading: boolean }>()
)

export const callDeleteBlogModalAction = createAction(
  '[Blog] delete blog modal',
  props<{ deleteBlogModal: boolean }>()
)
