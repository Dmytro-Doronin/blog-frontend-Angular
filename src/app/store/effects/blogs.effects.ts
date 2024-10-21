import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../../core/services/auth.service'
import { Router } from '@angular/router'
import {
  catchError,
  concatMap,
  debounceTime,
  delay,
  filter,
  finalize,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators'
import { concat, of } from 'rxjs'
import {
  addBlogsAction,
  addBlogsToStateAction,
  addPostsForBlogsToStateAction,
  deleteBlog,
  loadBlogs,
  loadPostsForBlogs,
  loadSearchBlogs,
  setAllBlogsToState,
  setAllPostsForBlogToState,
  setBlogsForSearchLoadingAction,
  setBlogsLoadingAction,
  setBlogsSearchAction,
  setPostsForBlogLoadingAction,
  successDeleteBlog,
  successUpdateDetailsBlog,
  updateBlog,
} from '../actions/blogs.actions'
import { BlogService } from '../../core/services/blog.service'
import { addAuthAlert, deleteAuthAlert } from '../actions/auth.actions'
import { BlogResponse } from '../../types/blogs.models'
import { PostResponse } from '../../types/posts.models'

@Injectable()
export class BlogsEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private blogService: BlogService,
    private router: Router
  ) {}

  blogAdd$ = createEffect(() =>
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

  blogEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBlog),
      concatMap(action =>
        concat(
          of(setBlogsLoadingAction({ loading: true })),
          this.blogService
            .editBlog({
              name: action.name,
              description: action.description,
              websiteUrl: action.websiteUrl,
              blogId: action.blogId,
            })
            .pipe(
              switchMap(() =>
                this.blogService.getBlogById(action.blogId).pipe(
                  mergeMap((updatedBlog: any) => {
                    console.log('get blog by id success')
                    return [
                      successUpdateDetailsBlog({ blog: updatedBlog }),
                      addAuthAlert({ severity: 'success', message: 'Blog was changed' }),
                      setBlogsLoadingAction({ loading: false }),
                    ]
                  }),
                  catchError(error => {
                    const message =
                      error?.error?.errorsMessages?.[0]?.message || 'Failed to load updated blog'
                    return of(
                      setBlogsLoadingAction({ loading: false }),
                      addAuthAlert({ severity: 'error', message: message })
                    )
                  })
                )
              ),
              catchError(error => {
                const message =
                  error?.error?.errorsMessages?.[0]?.message || 'Failed to update blog'
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

  deleteBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBlog),
      concatMap(action =>
        concat(
          of(setBlogsLoadingAction({ loading: true })),
          this.blogService.deleteBlogById(action.blogId).pipe(
            mergeMap((response: any) => {
              return [
                successDeleteBlog({ blogId: action.blogId }),
                addAuthAlert({ severity: 'success', message: 'Blog has been deleted!' }),
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

  getAllBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlogs),
      concatMap(action =>
        concat(
          of(setBlogsLoadingAction({ loading: true })),
          this.blogService.getBlogs(action.params).pipe(
            mergeMap((response: BlogResponse) => {
              if (action.params.pageNumber === 1) {
                return [
                  setAllBlogsToState({
                    pagesCount: response.pagesCount,
                    page: response.page,
                    pageSize: response.pageSize,
                    totalCount: response.totalCount,
                    blogs: response.items,
                    hasMoreBlogs: response.items.length === action.params.pageSize,
                  }),
                  setBlogsLoadingAction({ loading: false }),
                ]
              } else {
                return [
                  addBlogsToStateAction({
                    pagesCount: response.pagesCount,
                    page: response.page,
                    pageSize: response.pageSize,
                    totalCount: response.totalCount,
                    blogs: response.items,
                    hasMoreBlogs: response.items.length === action.params.pageSize,
                  }),
                  setBlogsLoadingAction({ loading: false }),
                ]
              }
            }),
            catchError(error => {
              const message = error?.error?.errorsMessages?.[0]?.message || 'Failed to load blogs'
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

  getAllBlogsForSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSearchBlogs),
      debounceTime(500),
      filter(action => (action.params.searchNameTerm?.trim().length ?? 0) > 0),
      concatMap(action =>
        concat(
          of(setBlogsForSearchLoadingAction({ blogsForSearchLoading: true })),
          this.blogService.getBlogs(action.params).pipe(
            mergeMap((response: BlogResponse) => {
              return [
                setBlogsSearchAction({
                  blogsForSearch: response.items,
                }),
                setBlogsForSearchLoadingAction({ blogsForSearchLoading: false }),
              ]
            }),
            catchError(error => {
              const message = error?.error?.errorsMessages?.[0]?.message || 'Failed to load blogs'
              return of(
                setBlogsForSearchLoadingAction({ blogsForSearchLoading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  getPostsForBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPostsForBlogs),
      concatMap(action =>
        concat(
          of(setPostsForBlogLoadingAction({ postsForBlogLoading: true })),
          this.blogService.getPostsForBlogs(action.params, action.id).pipe(
            mergeMap((response: PostResponse) => {
              if (action.params.pageNumber === 1) {
                return [
                  setAllPostsForBlogToState({
                    pagesCount: response.pagesCount,
                    page: response.page,
                    pageSize: response.pageSize,
                    totalCount: response.totalCount,
                    postsForBlogs: response.items,
                    hasMorePostsForBlogs: response.items.length === action.params.pageSize,
                  }),
                  setBlogsLoadingAction({ loading: false }),
                ]
              } else {
                return [
                  addPostsForBlogsToStateAction({
                    pagesCount: response.pagesCount,
                    page: response.page,
                    pageSize: response.pageSize,
                    totalCount: response.totalCount,
                    postsForBlogs: response.items,
                    hasMorePostsForBlogs: response.items.length === action.params.pageSize,
                  }),
                  setPostsForBlogLoadingAction({ postsForBlogLoading: false }),
                ]
              }
            }),
            catchError(error => {
              const message = error?.error?.errorsMessages?.[0]?.message || 'Failed to load blogs'
              return of(
                setPostsForBlogLoadingAction({ postsForBlogLoading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  clearAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAuthAlert),
      delay(5000),
      map(() => deleteAuthAlert())
    )
  )
}
