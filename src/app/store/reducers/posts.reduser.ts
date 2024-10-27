import { createReducer, on } from '@ngrx/store'
import { IPost } from '../../types/posts.models'
import {
  addPostsToStateAction,
  setAllPostsToState,
  setLikeStatusAsNoneForPostsAction,
  setPostsLoadingAction,
  setSortByAlphabetForPost,
  setSortByDateForPost,
} from '../actions/posts.action'
import {
  changeLikeStatusForPostInBlogAction,
  setSortByAlphabetForBlog,
  setSortByDateForBlog,
} from '../actions/blogs.actions'
import { updatePostLikesStatus } from '../../utils/post.utils'

export interface PostsState {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  posts: IPost[]
  loading: boolean
  hasMorePosts: boolean
  sortBy: string
  sortDirection: 'asc' | 'desc'
}

export const initialState: PostsState = {
  pagesCount: 0,
  page: 0,
  pageSize: 0,
  totalCount: 0,
  posts: [],
  loading: false,
  hasMorePosts: false,
  sortBy: 'createdAt',
  sortDirection: 'desc',
}

export const postsReducer = createReducer(
  initialState,
  on(
    setAllPostsToState,
    (state, { posts, pagesCount, page, pageSize, totalCount, hasMorePosts }) => ({
      ...state,
      posts: posts,
      pagesCount: pagesCount,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      hasMorePosts: hasMorePosts,
    })
  ),
  on(
    addPostsToStateAction,
    (state, { posts, pagesCount, page, pageSize, totalCount, hasMorePosts }) => ({
      ...state,
      posts: [...state.posts, ...posts],
      pagesCount: pagesCount,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      hasMorePosts: hasMorePosts,
    })
  ),
  on(setSortByAlphabetForPost, (state, { sortDirection }) => ({
    ...state,
    sortBy: 'name',
    sortDirection: sortDirection,
  })),
  on(setSortByDateForPost, (state, { sortBy, sortDirection }) => ({
    ...state,
    sortBy: sortBy,
    sortDirection: sortDirection,
  })),
  on(setPostsLoadingAction, (state, { loading }) => ({
    ...state,
    loading: loading,
  })),

  on(changeLikeStatusForPostInBlogAction, (state, { postId, status }) => ({
    ...state,
    posts: state.posts.map(post => {
      if (post.id === postId) {
        return updatePostLikesStatus(post, status)
      }
      return post
    }),
  })),

  on(setLikeStatusAsNoneForPostsAction, (state, { status }) => ({
    ...state,
    posts: state.posts.map(post => {
      return { ...post, extendedLikesInfo: { ...post.extendedLikesInfo, myStatus: status } }
    }),
  }))
)
