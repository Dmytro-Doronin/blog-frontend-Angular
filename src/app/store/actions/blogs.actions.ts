import { createAction, props } from '@ngrx/store'
import { BlogQueryParams, IBlog, PostBlogModel } from '../../types/blogs.models'
import {IPost, PostAddToBlogModel, PostQueryParams} from '../../types/posts.models'

export const addBlogsAction = createAction('[Add blog] add blog', props<PostBlogModel>())

export const loadBlogs = createAction('[Blog] get all blogs', props<{ params: BlogQueryParams }>())
export const loadSearchBlogs = createAction(
  '[Blog] get all blogs for search',
  props<{ params: BlogQueryParams }>()
)
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
export const setCurrentBlogId = createAction(
  '[Blog] set current blog id',
  props<{ blogId: string }>()
)

export const successDeleteBlog = createAction(
  '[Blog] success delete blog',
  props<{ blogId: string }>()
)
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

export const setBlogsForSearchLoadingAction = createAction(
  '[Blog] set blog for search loading',
  props<{ blogsForSearchLoading: boolean }>()
)

export const setBlogsSearchTermAction = createAction(
  '[Blog] set blog search term',
  props<{ searchTerm: string }>()
)
export const setBlogsSearchAction = createAction(
  '[Blog] set blog search action',
  props<{ blogsForSearch: IBlog[] }>()
)

export const callDeleteBlogModalAction = createAction(
  '[Blog] delete blog modal',
  props<{ deleteBlogModal: boolean }>()
)

export const setSortByDate = createAction(
  '[Blogs] Set Sort By Date',
  props<{ sortBy: 'createdAt'; sortDirection: 'asc' | 'desc' }>()
)

export const setSortByAlphabet = createAction(
  '[Blogs] Set Sort By Alphabet',
  props<{ sortDirection: 'asc' | 'desc' }>()
)

//POST FOR BLOG

export const addPostForBlogAction = createAction('[Add post] add post for blog', props<PostAddToBlogModel>())

export const loadPostsForBlogs = createAction(
  '[Blog] get all posts for blog',
  props<{ params: PostQueryParams; id: string }>()
)

export const setPostsForBlogLoadingAction = createAction(
  '[Blog] set posts for blog loading',
  props<{ postsForBlogLoading: boolean }>()
)

export const setAllPostsForBlogToState = createAction(
  '[Blog] Set all posts for blog to state',
  props<{
    postsForBlogs: IPost[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMorePostsForBlogs: boolean
  }>()
)

export const addPostsForBlogsToStateAction = createAction(
  '[Blogs] set all posts for blog at first load posts for blogs',
  props<{
    postsForBlogs: IPost[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMorePostsForBlogs: boolean
  }>()
)
