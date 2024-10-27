import { createAction, props } from '@ngrx/store'
import { IPost, PostQueryParams } from '../../types/posts.models'

export const loadPosts = createAction('[Posts] get all posts', props<{ params: PostQueryParams }>())
export const addNewPostAction = createAction(
  '[Posts] add new post 1',
  props<{ tittle: string; shortDescription: string; content: string; blogId: string }>()
)

export const setAllPostsToState = createAction(
  '[Posts] Set all posts to state',
  props<{
    posts: IPost[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMorePosts: boolean
  }>()
)

export const addPostsToStateAction = createAction(
  '[Posts] set all posts at first load posts',
  props<{
    posts: IPost[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMorePosts: boolean
  }>()
)

export const setPostsLoadingAction = createAction(
  '[Posts] set post loading',
  props<{ loading: boolean }>()
)

export const setLikeOrDislikeAction = createAction(
  '[Posts] set like or dislike',
  props<{ status: 'Like' | 'Dislike' | 'None'; postId: string }>()
)

export const setSortByDateForPost = createAction(
  '[Posts] Set Sort By Date',
  props<{ sortBy: 'createdAt'; sortDirection: 'asc' | 'desc' }>()
)

export const setSortByAlphabetForPost = createAction(
  '[Posts] Set Sort By Alphabet',
  props<{ sortDirection: 'asc' | 'desc' }>()
)

export const changeLikeStatusForPostAction = createAction(
  '[Posts] change like status for post',
  props<{ postId: string; status: 'Like' | 'Dislike' | 'None' }>()
)

export const setLikeStatusAsNoneForPostsAction = createAction(
  '[Posts] set like status for posts as none',
  props<{ status: 'None' }>()
)
