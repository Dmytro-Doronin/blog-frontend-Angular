import { createReducer, on } from '@ngrx/store'

import {
  addBlogsToStateAction,
  addPostsForBlogsToStateAction,
  callDeleteBlogModalAction,
  changeLikeStatusForPostAction,
  setAllBlogsToState,
  setAllPostsForBlogToState,
  setBlogByIdAction,
  setBlogsForSearchLoadingAction,
  setBlogsLoadingAction,
  setBlogsSearchAction,
  setBlogsSearchTermAction,
  setCurrentBlogId,
  setLikeStatusAsNoneForPostsAction,
  setPostsForBlogLoadingAction,
  setSortByAlphabetForBlog,
  setSortByDateForBlog,
  successDeleteBlog,
  successUpdateDetailsBlog,
} from '../actions/blogs.actions'
import { IBlog } from '../../types/blogs.models'
import { IPost } from '../../types/posts.models'
import { updatePostLikesStatus } from '../../utils/post.utils'

export interface BlogsState {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  blogs: IBlog[]
  blogsForSearch: IBlog[]
  posts: {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMorePostsForBlogs: boolean
    postsForBlogs: IPost[]
  }
  blog: IBlog
  blogsForSearchLoading: boolean
  searchTerm: string
  loading: boolean
  hasMoreBlogs: boolean
  deleteBlogModal: boolean
  currentBlogId: string
  postsForBlogLoading: boolean
  sortBy: string
  sortDirection: 'asc' | 'desc'
}

export const initialState: BlogsState = {
  pagesCount: 0,
  page: 0,
  pageSize: 0,
  totalCount: 0,
  blogs: [],
  blog: {
    id: '',
    name: '',
    description: '',
    websiteUrl: '',
    createdAt: '',
    isMembership: false,
    userName: '',
    userId: '',
  },
  blogsForSearch: [],
  posts: {
    pagesCount: 0,
    page: 0,
    pageSize: 0,
    totalCount: 0,
    hasMorePostsForBlogs: false,
    postsForBlogs: [],
  },
  blogsForSearchLoading: false,
  loading: false,
  hasMoreBlogs: false,
  deleteBlogModal: false,
  currentBlogId: '',
  searchTerm: '',
  postsForBlogLoading: false,
  sortBy: 'createdAt',
  sortDirection: 'desc',
}

export const blogsReducer = createReducer(
  initialState,
  on(setBlogsLoadingAction, (state, { loading }) => ({ ...state, loading: loading })),
  on(setPostsForBlogLoadingAction, (state, { postsForBlogLoading }) => ({
    ...state,
    postsForBlogLoading: postsForBlogLoading,
  })),
  on(setBlogsForSearchLoadingAction, (state, { blogsForSearchLoading }) => ({
    ...state,
    blogsForSearchLoading: blogsForSearchLoading,
  })),
  on(setBlogsSearchTermAction, (state, { searchTerm }) => ({ ...state, searchTerm: searchTerm })),
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
  ),
  on(
    setAllPostsForBlogToState,
    (state, { postsForBlogs, pagesCount, page, pageSize, totalCount, hasMorePostsForBlogs }) => ({
      ...state,
      posts: {
        pagesCount: pagesCount,
        page: page,
        pageSize: pageSize,
        totalCount: totalCount,
        hasMorePostsForBlogs: hasMorePostsForBlogs,
        postsForBlogs: postsForBlogs,
      },
    })
  ),

  on(
    addPostsForBlogsToStateAction,
    (state, { postsForBlogs, pagesCount, page, pageSize, totalCount, hasMorePostsForBlogs }) => ({
      ...state,
      posts: {
        pagesCount: pagesCount,
        page: page,
        pageSize: pageSize,
        totalCount: totalCount,
        hasMorePostsForBlogs: hasMorePostsForBlogs,
        postsForBlogs: [...state.posts.postsForBlogs, ...postsForBlogs],
      },
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
  on(changeLikeStatusForPostAction, (state, { postId, status }) => ({
    ...state,
    posts: {
      ...state.posts,
      postsForBlogs: state.posts.postsForBlogs.map(post => {
        if (post.id === postId) {
          return updatePostLikesStatus(post, status)
        }
        return post
      }),
    },
  })),
  on(setLikeStatusAsNoneForPostsAction, (state, { status }) => ({
    ...state,
    posts: {
      ...state.posts,
      postsForBlogs: state.posts.postsForBlogs.map(post => {
        return { ...post, extendedLikesInfo: { ...post.extendedLikesInfo, myStatus: status } }
      }),
    },
  })),

  on(callDeleteBlogModalAction, (state, { deleteBlogModal }) => ({
    ...state,
    deleteBlogModal: deleteBlogModal,
  })),

  on(
    setBlogByIdAction,
    (state, { id, name, description, websiteUrl, createdAt, isMembership, userName, userId }) => ({
      ...state,
      blog: { id, name, description, websiteUrl, createdAt, isMembership, userId, userName },
    })
  ),

  on(setCurrentBlogId, (state, { blogId }) => ({
    ...state,
    currentBlogId: blogId,
  })),
  on(setSortByDateForBlog, (state, { sortBy, sortDirection }) => ({
    ...state,
    sortBy: sortBy,
    sortDirection: sortDirection,
  })),

  on(setBlogsSearchAction, (state, { blogsForSearch }) => ({
    ...state,
    blogsForSearch: blogsForSearch,
  })),
  on(setSortByAlphabetForBlog, (state, { sortDirection }) => ({
    ...state,
    sortBy: 'name',
    sortDirection: sortDirection,
  }))
)
