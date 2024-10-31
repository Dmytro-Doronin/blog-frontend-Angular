import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, mergeMap } from 'rxjs/operators'
import { concat, of } from 'rxjs'
import { addAuthAlert } from '../actions/auth.actions'
import { CommentsService } from '../../core/services/comments.service'
import {
  addCommentsToStateAction,
  addSingleCommentToStateAction,
  sendCommentsAction,
  setLoadingForCommentsAction,
} from '../actions/comments.action'
import { IComment } from '../../types/comments.model'

@Injectable()
export class CommentsEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentsService
  ) {}

  addPostForBlog$ = createEffect(() =>
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
}
