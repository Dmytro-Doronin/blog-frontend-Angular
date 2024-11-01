import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, mergeMap } from 'rxjs/operators'
import { concat, of } from 'rxjs'
import { addAuthAlert } from '../actions/auth.actions'
import { CommentsService } from '../../core/services/comments.service'
import {
  addCommentsToStateAction,
  addSingleCommentToStateAction,
  getCommentsForPostAction,
  sendCommentsAction,
  setAllCommentsToState,
  setLoadingForCommentsAction,
} from '../actions/comments.action'
import { CommentResponse, IComment } from '../../types/comments.model'
import {
  addPostsForBlogsToStateAction,
  loadPostsForBlogs,
  setAllPostsForBlogToState,
  setPostsForBlogLoadingAction,
} from '../actions/blogs.actions'
import { PostResponse } from '../../types/posts.models'

@Injectable()
export class CommentsEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentsService
  ) {}

  addСommentForPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendCommentsAction),
      concatMap(action =>
        concat(
          of(setLoadingForCommentsAction({ loading: true })),
          this.commentService
            .postComment({
              content: action.content,
              postId: action.postId,
            })
            .pipe(
              mergeMap((response: IComment) => {
                console.log('Response from server:', response)
                return [
                  addSingleCommentToStateAction({ comment: response }),
                  addAuthAlert({ severity: 'success', message: 'Comment has been added!' }),
                  setLoadingForCommentsAction({ loading: false }),
                ]
              }),
              catchError(error => {
                const message = error.error.errorsMessages[0].message
                return of(
                  setLoadingForCommentsAction({ loading: false }),
                  addAuthAlert({ severity: 'error', message: message })
                )
              })
            )
        )
      )
    )
  )

  getCommentsForPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCommentsForPostAction),
      concatMap(action =>
        concat(
          of(setLoadingForCommentsAction({ loading: true })),
          this.commentService.getAllComment(action.postId, action.commentParams).pipe(
            mergeMap((commentResponse: CommentResponse) => {
              if (action.commentParams.pageNumber === 1) {
                return [
                  setAllCommentsToState({
                    pagesCount: commentResponse.pagesCount,
                    page: commentResponse.page,
                    pageSize: commentResponse.pageSize,
                    totalCount: commentResponse.totalCount,
                    comments: commentResponse.items,
                    hasMoreComments: commentResponse.items.length === action.commentParams.pageSize,
                  }),
                ]
              } else {
                return [
                  addCommentsToStateAction({
                    pagesCount: commentResponse.pagesCount,
                    page: commentResponse.page,
                    pageSize: commentResponse.pageSize,
                    totalCount: commentResponse.totalCount,
                    comments: commentResponse.items,
                    hasMoreComments: commentResponse.items.length === action.commentParams.pageSize,
                  }),
                ]
              }
            }),
            catchError(error => {
              const message = error?.error?.errorsMessages?.[0]?.message || 'Failed to load blogs'
              return of(
                setLoadingForCommentsAction({ loading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )
}
