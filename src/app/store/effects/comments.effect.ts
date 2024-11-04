import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, mergeMap, switchMap } from 'rxjs/operators'
import { concat, of } from 'rxjs'
import { addAuthAlert } from '../actions/auth.actions'
import { CommentsService } from '../../core/services/comments.service'
import {
  addCommentsToStateAction,
  addSingleCommentToStateAction,
  changeLikeStatusForCommentInPostAction,
  deleteCommentAction,
  getCommentsForPostAction,
  sendCommentsAction,
  setAllCommentsToState,
  setEditLoadingForCommentsAction,
  setLikeOrDislikeForCommentAction,
  setLoadingForCommentsAction,
  successDeleteCommentAction,
  successUpdateCommentAction,
  updateCommentAction,
} from '../actions/comments.action'
import { CommentResponse, IComment } from '../../types/comments.model'

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

  deleteСomment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCommentAction),
      concatMap(action =>
        concat(
          of(setLoadingForCommentsAction({ loading: true })),
          this.commentService.deleteCommentById(action.commentId).pipe(
            mergeMap((response: any) => {
              return [
                successDeleteCommentAction({ commentId: action.commentId }),
                addAuthAlert({ severity: 'success', message: 'Comment has been deleted!' }),
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

  updateСomment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCommentAction),
      concatMap(action =>
        concat(
          of(setEditLoadingForCommentsAction({ editLoading: true })),
          this.commentService.changeComment(action.content, action.commentId).pipe(
            switchMap(() =>
              this.commentService.getCommentById(action.commentId).pipe(
                mergeMap((updatedComment: IComment) => {
                  return [
                    successUpdateCommentAction({ comment: updatedComment }),
                    addAuthAlert({ severity: 'success', message: 'Comment was updated' }),
                    setEditLoadingForCommentsAction({ editLoading: false }),
                  ]
                }),
                catchError(error => {
                  const message =
                    error?.error?.errorsMessages?.[0]?.message || 'Failed to load updated blog'
                  return of(
                    setEditLoadingForCommentsAction({ editLoading: false }),
                    addAuthAlert({ severity: 'error', message: message })
                  )
                })
              )
            ),
            catchError(error => {
              const message =
                error?.error?.errorsMessages?.[0]?.message || 'Failed to update comment'
              return of(
                setEditLoadingForCommentsAction({ editLoading: false }),
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
              const actions =
                action.commentParams.pageNumber === 1
                  ? [
                      setAllCommentsToState({
                        pagesCount: commentResponse.pagesCount,
                        page: commentResponse.page,
                        pageSize: commentResponse.pageSize,
                        totalCount: commentResponse.totalCount,
                        comments: commentResponse.items,
                        hasMoreComments:
                          commentResponse.items.length === action.commentParams.pageSize,
                      }),
                    ]
                  : [
                      addCommentsToStateAction({
                        pagesCount: commentResponse.pagesCount,
                        page: commentResponse.page,
                        pageSize: commentResponse.pageSize,
                        totalCount: commentResponse.totalCount,
                        comments: commentResponse.items,
                        hasMoreComments:
                          commentResponse.items.length === action.commentParams.pageSize,
                      }),
                    ]
              return [...actions, setLoadingForCommentsAction({ loading: false })]
            }),
            catchError(error => {
              const message =
                error?.error?.errorsMessages?.[0]?.message || 'Failed to load comments'
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

  likesComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setLikeOrDislikeForCommentAction),
      concatMap(action =>
        concat(
          // of(setBlogsLoadingAction({ loading: true })),
          this.commentService.setLikeOrDislikeForComment(action.status, action.commentId).pipe(
            mergeMap((response: any) => {
              return [
                changeLikeStatusForCommentInPostAction({
                  commentId: action.commentId,
                  status: action.status,
                }),
                // addAuthAlert({ severity: 'success', message: 'Blog has been added!' }),
                // setBlogsLoadingAction({ loading: false }),
              ]
            }),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                // setBlogsLoadingAction({ loading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )
}
