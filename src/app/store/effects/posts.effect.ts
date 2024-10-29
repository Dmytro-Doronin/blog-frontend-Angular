import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../../core/services/auth.service'
import { BlogService } from '../../core/services/blog.service'
import { Router } from '@angular/router'
import {
  changeLikeStatusForPostInBlogAction,
  deleteBlog,
  setBlogsLoadingAction,
  successDeleteBlog
} from '../actions/blogs.actions'
import { catchError, concatMap, mergeMap } from 'rxjs/operators'
import { concat, of } from 'rxjs'
import { addAuthAlert } from '../actions/auth.actions'
import {
  addNewPostAction,
  addPostsToStateAction,
  changeLikeStatusForPostAction, deletePost,
  loadPosts,
  setAllPostsToState,
  setLikeOrDislikeAction,
  setPostsLoadingAction, successDeletePost,
} from '../actions/posts.action'
import { PostsService } from '../../core/services/posts.service'
import { PostResponse } from '../../types/posts.models'

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private blogService: BlogService,
    private postService: PostsService,
    private router: Router
  ) {}

  getAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      concatMap(action =>
        concat(
          of(setPostsLoadingAction({ loading: true })),
          this.postService.getPosts(action.params).pipe(
            mergeMap((response: PostResponse) => {
              if (action.params.pageNumber === 1) {
                return [
                  setAllPostsToState({
                    pagesCount: response.pagesCount,
                    page: response.page,
                    pageSize: response.pageSize,
                    totalCount: response.totalCount,
                    posts: response.items,
                    hasMorePosts: response.items.length === action.params.pageSize,
                  }),
                  setPostsLoadingAction({ loading: false }),
                ]
              } else {
                return [
                  addPostsToStateAction({
                    pagesCount: response.pagesCount,
                    page: response.page,
                    pageSize: response.pageSize,
                    totalCount: response.totalCount,
                    posts: response.items,
                    hasMorePosts: response.items.length === action.params.pageSize,
                  }),
                  setPostsLoadingAction({ loading: false }),
                ]
              }
            }),
            catchError(error => {
              const message = error?.error?.errorsMessages?.[0]?.message || 'Failed to load posts'
              return of(
                setPostsLoadingAction({ loading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  postAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewPostAction),
      concatMap(action =>
        concat(
          of(setPostsLoadingAction({ loading: true })),
          this.postService
            .addNewPost({
              title: action.tittle,
              shortDescription: action.shortDescription,
              content: action.content,
              blogId: action.blogId,
            })
            .pipe(
              mergeMap((response: any) => {
                return [
                  addAuthAlert({ severity: 'success', message: 'Post has been added!' }),
                  setPostsLoadingAction({ loading: false }),
                ]
              }),
              catchError(error => {
                const message = error.error.errorsMessages[0].message
                return of(
                  setPostsLoadingAction({ loading: false }),
                  addAuthAlert({ severity: 'error', message: message })
                )
              })
            )
        )
      )
    )
  )

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      concatMap(action =>
        concat(
          of(setPostsLoadingAction({ loading: true })),
          this.postService.deletePostById(action.postId).pipe(
            mergeMap((response: any) => {
              return [
                successDeletePost({ postId: action.postId }),
                addAuthAlert({ severity: 'success', message: 'Post has been deleted!' }),
                setPostsLoadingAction({ loading: false }),
              ]
            }),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                setPostsLoadingAction({ loading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  likesPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setLikeOrDislikeAction),
      concatMap(action =>
        concat(
          // of(setBlogsLoadingAction({ loading: true })),
          this.postService.setLikeOrDislike(action.status, action.postId).pipe(
            mergeMap((response: any) => {
              return [
                changeLikeStatusForPostInBlogAction({
                  postId: action.postId,
                  status: action.status,
                }),
                changeLikeStatusForPostAction({
                  postId: action.postId,
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
