import { createAction, props } from '@ngrx/store'
import { CommentsQueryParams, IComment } from '../../types/comments.model'

export const sendCommentsAction = createAction(
  '[Comments] send comment',
  props<{ postId: string; content: string }>()
)
export const deleteCommentAction = createAction(
  '[Comments] delete comment',
  props<{ commentId: string }>()
)

export const successDeleteCommentAction = createAction(
  '[Comments] success delete comment',
  props<{ commentId: string }>()
)
export const setLoadingForCommentsAction = createAction(
  '[Comments] set loading',
  props<{ loading: boolean }>()
)
export const setEditLoadingForCommentsAction = createAction(
  '[Comments] set loading',
  props<{ editLoading: boolean }>()
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

export const getCommentsForPostAction = createAction(
  '[Comment] get comments by id',
  props<{ postId: string; commentParams: CommentsQueryParams }>()
)

export const setLikeOrDislikeForCommentAction = createAction(
  '[Comment] set like or dislike',
  props<{
    status: 'Like' | 'Dislike' | 'None'
    commentId: string
    authorName?: string
    userId?: string
  }>()
)

export const changeLikeStatusForCommentInPostAction = createAction(
  '[Comment] change like status for comment in post',
  props<{ commentId: string; status: 'Like' | 'Dislike' | 'None' }>()
)
export const setEditCommentAction = createAction(
  '[Comment] set edit comment id',
  props<{ commentId: string }>()
)
export const updateCommentAction = createAction(
  '[Comment] update comment',
  props<{ commentId: string; content: string }>()
)
export const successUpdateCommentAction = createAction(
  '[Comment] success update comment',
  props<{ comment: IComment }>()
)
