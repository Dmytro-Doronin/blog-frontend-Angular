import { createReducer, on } from '@ngrx/store'
import { IPost } from '../../types/posts.models'
import {
  addPostsToStateAction, callDeletePostModalAction,
  setAllPostsToState, setCurrentPostId,
  setLikeStatusAsNoneForPostsAction,
  setPostsLoadingAction,
  setSortByAlphabetForPost,
  setSortByDateForPost, successDeletePost,
} from '../actions/posts.action'
import {
  changeLikeStatusForPostInBlogAction,
  setSortByAlphabetForBlog,
  setSortByDateForBlog, successDeleteBlog,
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
  deletePostModal: boolean
  currentPostId: string
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
  deletePostModal: false,
  currentPostId: ''
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
  on(setCurrentPostId, (state, { currentPostId }) => ({
    ...state,
    currentPostId: currentPostId,
  })),
  on(callDeletePostModalAction, (state, { deletePostModal }) => ({
    ...state,
    deletePostModal: deletePostModal,
  })),
  on(successDeletePost, (state, { postId }) => ({
    ...state,
    posts: state.posts.filter(b => b.id !== postId),
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
