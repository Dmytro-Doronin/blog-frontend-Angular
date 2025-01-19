import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../../core/services/auth.service'
import { BlogService } from '../../core/services/blog.service'
import { Router } from '@angular/router'
import { changeLikeStatusForPostInBlogAction, setBlogByIdAction } from '../actions/blogs.actions'
import { catchError, concatMap, filter, mergeMap, switchMap } from 'rxjs/operators'
import { concat, of } from 'rxjs'
import { addAuthAlert } from '../actions/auth.actions'
import {
  addNewPostAction,
  addPostsToStateAction,
  changeLikeStatusForPostAction,
  deletePost,
  getPostByIdAction,
  loadPosts,
  setAllPostsToState,
  setLikeOrDislikeAction,
  setLoadMorePostsLoadingAction,
  setPostByIdAction,
  setPostsLoadingAction,
  successDeletePost,
  successUpdateDetailsPost,
  updatePost,
} from '../actions/posts.action'
import { PostsService } from '../../core/services/posts.service'
import { PostResponse } from '../../types/posts.models'
import { CommentsService } from '../../core/services/comments.service'
import { IBlog } from '../../types/blogs.models'

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private blogService: BlogService,
    private postService: PostsService,
    private commentService: CommentsService,
    private router: Router
  ) {}

  loadInitialPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      filter(action => action.params.pageNumber === 1), // Только для первой страницы
      concatMap(action =>
        concat(
          of(setPostsLoadingAction({ loading: true })),
          this.postService.getPosts(action.params).pipe(
            mergeMap((response: PostResponse) => [
              setAllPostsToState({
                pagesCount: response.pagesCount,
                page: response.page,
                pageSize: response.pageSize,
                totalCount: response.totalCount,
                posts: response.items,
                hasMorePosts: response.items.length === action.params.pageSize,
              }),
              setPostsLoadingAction({ loading: false }),
            ]),
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

  loadMorePosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      filter(action => action.params.pageNumber !== undefined && action.params.pageNumber > 1),
      concatMap(action =>
        concat(
          of(setLoadMorePostsLoadingAction({ loadMorePostsLoading: true })),
          this.postService.getPosts(action.params).pipe(
            mergeMap((response: PostResponse) => [
              addPostsToStateAction({
                pagesCount: response.pagesCount,
                page: response.page,
                pageSize: response.pageSize,
                totalCount: response.totalCount,
                posts: response.items,
                hasMorePosts: response.items.length === action.params.pageSize,
              }),
              setLoadMorePostsLoadingAction({ loadMorePostsLoading: false }),
            ]),
            catchError(error => {
              const message = error?.error?.errorsMessages?.[0]?.message || 'Failed to load posts'
              return of(
                setLoadMorePostsLoadingAction({ loadMorePostsLoading: false }),
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
              file: action.file,
            })
            .pipe(
              mergeMap((response: any) => {
                return [
                  addAuthAlert({ severity: 'success', message: 'Post has been added!' }),
                  setPostsLoadingAction({ loading: false }),
                ]
              }),
              catchError(error => {
                const message =
                  error.error.errorsMessages[0].message ||
                  error.error.errorsMessages[0] ||
                  'Failed to add post'
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
            mergeMap(() => {
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

  postEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      concatMap(action =>
        concat(
          of(setPostsLoadingAction({ loading: true })),
          this.postService
            .editPost({
              title: action.title,
              shortDescription: action.shortDescription,
              content: action.content,
              postId: action.postId,
              blogId: action.blogId,
              file: action.file,
            })
            .pipe(
              switchMap(() =>
                this.postService.getPostById(action.postId).pipe(
                  mergeMap((updatedPost: any) => {
                    console.log('get post by id success')
                    return [
                      successUpdateDetailsPost({ post: updatedPost }),
                      addAuthAlert({ severity: 'success', message: 'Post was changed' }),
                      setPostsLoadingAction({ loading: false }),
                    ]
                  }),
                  catchError(error => {
                    const message =
                      error?.error?.errorsMessages?.[0]?.message ||
                      error.error.errorsMessages[0] ||
                      'Failed to load post'
                    return of(
                      setPostsLoadingAction({ loading: false }),
                      addAuthAlert({ severity: 'error', message: message })
                    )
                  })
                )
              ),
              catchError(error => {
                const message =
                  error?.error?.errorsMessages?.[0]?.message ||
                  error.error.errorsMessages[0] ||
                  'Failed to edit post'
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

  getPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPostByIdAction),
      concatMap(action =>
        concat(
          of(setPostsLoadingAction({ loading: true })),
          this.postService.getPostById(action.postId).pipe(
            switchMap((response: any) =>
              concat(
                of(
                  setPostByIdAction({
                    ...response,
                    extendedLikesInfo: response.extendedLikesInfo,
                  })
                ),
                this.blogService.getBlogById(response.blogId).pipe(
                  mergeMap((blog: IBlog) => [setBlogByIdAction({ ...blog })]),
                  catchError(error => {
                    const message =
                      error?.error?.errorsMessages?.[0]?.message || 'Failed to load blog'
                    return of(
                      setPostsLoadingAction({ loading: false }),
                      addAuthAlert({ severity: 'error', message: message })
                    )
                  })
                ),
                of(setPostsLoadingAction({ loading: false }))
              )
            ),
            catchError(error => {
              const message = error?.error?.errorsMessages?.[0]?.message || 'Failed to get post'
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
            mergeMap(() => {
              return [
                changeLikeStatusForPostInBlogAction({
                  postId: action.postId,
                  status: action.status,
                }),
                changeLikeStatusForPostAction({
                  postId: action.postId,
                  status: action.status,
                  authorName: action.authorName,
                  userId: action.userId,
                }),
              ]
            }),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(addAuthAlert({ severity: 'error', message: message }))
            })
          )
        )
      )
    )
  )
}
