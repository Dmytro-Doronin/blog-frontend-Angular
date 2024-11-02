import { createReducer, on } from '@ngrx/store'

import { IComment } from '../../types/comments.model'
import {
  addCommentsToStateAction,
  addSingleCommentToStateAction,
  setAllCommentsToState,
  setLoadingForCommentsAction,
} from '../actions/comments.action'

export interface CommentsState {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  hasMoreComments: boolean
  loading: boolean
  comments: IComment[]
}

export const initialState: CommentsState = {
  pagesCount: 0,
  page: 0,
  pageSize: 0,
  totalCount: 0,
  hasMoreComments: false,
  loading: false,
  comments: [],
}

export const commentsReducer = createReducer(
  initialState,
  on(
    setAllCommentsToState,
    (state, { comments, pagesCount, page, pageSize, totalCount, hasMoreComments }) => ({
      ...state,
      comments: comments,
      pagesCount: pagesCount,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      hasMoreComments: hasMoreComments,
    })
  ),
  on(
    addCommentsToStateAction,
    (state, { comments, pagesCount, page, pageSize, totalCount, hasMoreComments }) => ({
      ...state,
      comments: [...state.comments, ...comments],
      pagesCount: pagesCount,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      hasMoreComments: hasMoreComments,
    })
  ),
  on(setLoadingForCommentsAction, (state, { loading }) => ({
    ...state,
    loading: loading,
  })),
  on(addSingleCommentToStateAction, (state, { comment }) => ({
    ...state,
    comments: [comment, ...state.comments],
  }))
)
