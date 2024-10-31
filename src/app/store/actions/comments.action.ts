import { createAction, props } from '@ngrx/store'
import { IComment } from '../../types/comments.model'

export const sendCommentsAction = createAction(
  '[Comments] send comment',
  props<{ postId: string; content: string }>()
)
export const setLoadingForCommentsAction = createAction(
  '[Comments] set loading',
  props<{ loading: boolean }>()
)

export const loadCommentsAction = createAction(
  '[Comments] send comment',
  props<{ postId: string }>()
)

export const setAllCommentsToState = createAction(
  '[Comments] Set all comments to state',
  props<{
    comments: IComment[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMoreComments: boolean
  }>()
)

export const addCommentsToStateAction = createAction(
  '[Comments] set all comments at first load posts',
  props<{
    comments: IComment[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMoreComments: boolean
  }>()
)

export const addSingleCommentToStateAction = createAction(
  '[Comments] set single comment at first load posts',
  props<{
    comment: IComment
  }>()
)
