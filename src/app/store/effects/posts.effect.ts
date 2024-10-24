import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../../core/services/auth.service'
import { BlogService } from '../../core/services/blog.service'
import { Router } from '@angular/router'
import {
  addBlogsAction,
  changeLikeStatusForPostAction,
  setBlogsLoadingAction,
} from '../actions/blogs.actions'
import { catchError, concatMap, mergeMap } from 'rxjs/operators'
import { concat, of } from 'rxjs'
import { addAuthAlert } from '../actions/auth.actions'
import { setLikeOrDislikeAction } from '../actions/posts.action'
import { PostsService } from '../../core/services/posts.service'

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private blogService: BlogService,
    private postService: PostsService,
    private router: Router
  ) {}

  likesPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setLikeOrDislikeAction),
      concatMap(action =>
        concat(
          // of(setBlogsLoadingAction({ loading: true })),
          this.postService.setLikeOrDislike(action.status, action.postId).pipe(
            mergeMap((response: any) => {
              return [
                changeLikeStatusForPostAction({ postId: action.postId, status: action.status }),
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
