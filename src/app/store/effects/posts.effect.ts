import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../../core/services/auth.service'
import { BlogService } from '../../core/services/blog.service'
import { Router } from '@angular/router'
import { addBlogsAction, setBlogsLoadingAction } from '../actions/blogs.actions'
import { catchError, concatMap, mergeMap } from 'rxjs/operators'
import { concat, of } from 'rxjs'
import { addAuthAlert } from '../actions/auth.actions'

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private blogService: BlogService,
    private router: Router
  ) {}

  likesPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBlogsAction),
      concatMap(action =>
        concat(
          of(setBlogsLoadingAction({ loading: true })),
          this.blogService
            .postBlog({
              name: action.name,
              description: action.description,
              websiteUrl: action.websiteUrl,
            })
            .pipe(
              mergeMap((response: any) => {
                return [
                  addAuthAlert({ severity: 'success', message: 'Blog has been added!' }),
                  setBlogsLoadingAction({ loading: false }),
                ]
              }),
              catchError(error => {
                const message = error.error.errorsMessages[0].message
                return of(
                  setBlogsLoadingAction({ loading: false }),
                  addAuthAlert({ severity: 'error', message: message })
                )
              })
            )
        )
      )
    )
  )
}
