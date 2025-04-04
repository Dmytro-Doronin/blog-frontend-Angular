import { createReducer, on } from '@ngrx/store'
import { IPost } from '../../types/posts.models'
import {
  addPostsToStateAction,
  callDeletePostModalAction,
  changeLikeStatusForPostAction,
  setAllPostsToState,
  setCurrentPostId,
  setLikeStatusAsNoneForPostsAction,
  setLoadMorePostsLoadingAction,
  setPostByIdAction,
  setPostsLoadingAction,
  setSortByAlphabetForPost,
  setSortByDateForPost,
  successDeletePost,
  successUpdateDetailsPost,
} from '../actions/posts.action'
import { changeLikeStatusForPostInBlogAction } from '../actions/blogs.actions'
import { updatePostLikesStatus } from '../../utils/post.utils'

export interface PostsState {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  posts: IPost[]
  post: IPost | null
  loading: boolean
  loadMorePostsLoading: boolean
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
  post: null,
  loading: false,
  loadMorePostsLoading: false,
  hasMorePosts: false,
  sortBy: 'createdAt',
  sortDirection: 'desc',
  deletePostModal: false,
  currentPostId: '',
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

  on(setLoadMorePostsLoadingAction, (state, { loadMorePostsLoading }) => ({
    ...state,
    loadMorePostsLoading: loadMorePostsLoading,
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
  on(successUpdateDetailsPost, (state, { post }) => ({
    ...state,
    posts: state.posts.map(b => (b.id === post.id ? post : b)),
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
  on(changeLikeStatusForPostAction, (state, { postId, status, authorName, userId }) => {
    return {
      ...state,
      post:
        state.post && state.post.id === postId
          ? updatePostLikesStatus(state.post, status, authorName, userId)
          : state.post,
    }
  }),

  on(setLikeStatusAsNoneForPostsAction, (state, { status }) => ({
    ...state,
    posts: state.posts.map(post => {
      return { ...post, extendedLikesInfo: { ...post.extendedLikesInfo, myStatus: status } }
    }),
  })),
  on(setPostByIdAction, (state, { ...post }) => ({
    ...state,
    post: { ...post, extendedLikesInfo: post.extendedLikesInfo },
  }))
)
