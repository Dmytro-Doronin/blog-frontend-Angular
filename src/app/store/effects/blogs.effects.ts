import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../../core/services/auth/auth.service'
import { Router } from '@angular/router'
import {
  catchError,
  concatMap,
  debounceTime,
  delay,
  filter,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators'
import { concat, of } from 'rxjs'
import {
  addBlogsAction,
  addBlogsToStateAction,
  addPostForBlogAction,
  addPostsForBlogsToStateAction,
  deleteBlog,
  getBlogByIdAction,
  loadBlogs,
  loadBlogsForUser,
  loadPostsForBlogs,
  loadSearchBlogs,
  setAllBlogsForCurrentUserToState,
  setAllBlogsToState,
  setAllPostsForBlogToState,
  setBlogByIdAction,
  setBlogsForSearchLoadingAction,
  setBlogsLoadingAction,
  setBlogsSearchAction,
  setMoreBlogsLoadingAction,
  setPostsForBlogLoadingAction,
  successDeleteBlog,
  successUpdateDetailsBlog,
  updateBlog,
} from '../actions/blogs.actions'
import { BlogService } from '../../core/services/blog/blog.service'
import { addAuthAlert, deleteAuthAlert } from '../actions/auth.actions'
import { BlogResponse } from '../../types/blogs.models'
import { PostResponse } from '../../types/posts.models'
import {
  addPostsToStateAction,
  setAllPostsToState,
  setPostsLoadingAction,
} from '../actions/posts.action'

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
              file: action.file,
            })
            .pipe(
              mergeMap((response: any) => {
                return [
                  addAuthAlert({ severity: 'success', message: 'Blog has been added!' }),
                  setBlogsLoadingAction({ loading: false }),
                ]
              }),
              catchError(error => {
                const message =
                  error.error.errorsMessages[0].message ||
                  error.error.errorsMessages[0] ||
                  'Failed to add blog'
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

  getBlogById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBlogByIdAction),
      concatMap(action =>
        concat(
          of(setBlogsLoadingAction({ loading: true })),
          this.blogService.getBlogById(action.blogId).pipe(
            mergeMap((response: any) => {
              return [
                setBlogByIdAction({
                  id: response.id,
                  userId: response.userId,
                  name: response.name,
                  description: response.description,
                  websiteUrl: response.websiteUrl,
                  userName: response.userName,
                  createdAt: response.createdAt,
                  isMembership: response.isMembership,
                  imageUrl: response.imageUrl,
                }),
                // addAuthAlert({ severity: 'success', message: 'Blog has been added!' }),
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
              file: action.file,
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
                      error?.error?.errorsMessages?.[0]?.message ||
                      error.errorsMessages[0] ||
                      'Failed to load updated blog'
                    return of(
                      setBlogsLoadingAction({ loading: false }),
                      addAuthAlert({ severity: 'error', message: message })
                    )
                  })
                )
              ),
              catchError(error => {
                const message =
                  error?.error?.errorsMessages?.[0]?.message ||
                  error.error.errorsMessages[0] ||
                  'Failed to update blog'
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

  loadInitialBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlogs),
      filter(action => action.params.pageNumber === 1),
      concatMap(action =>
        concat(
          of(setBlogsLoadingAction({ loading: true })),
          this.blogService.getBlogs(action.params).pipe(
            mergeMap((response: BlogResponse) => [
              setAllBlogsToState({
                pagesCount: response.pagesCount,
                page: response.page,
                pageSize: response.pageSize,
                totalCount: response.totalCount,
                blogs: response.items,
                hasMoreBlogs:
                  response.totalCount > action.params.pageSize! * action.params.pageNumber!,
              }),
              setBlogsLoadingAction({ loading: false }),
            ]),
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

  loadMoreBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlogs),
      filter(action => action.params.pageNumber !== undefined && action.params.pageNumber > 1),
      concatMap(action =>
        concat(
          of(setMoreBlogsLoadingAction({ moreBlogsLoading: true })),
          this.blogService.getBlogs(action.params).pipe(
            mergeMap((response: BlogResponse) => [
              addBlogsToStateAction({
                pagesCount: response.pagesCount,
                page: response.page,
                pageSize: response.pageSize,
                totalCount: response.totalCount,
                blogs: response.items,
                hasMoreBlogs:
                  response.totalCount > action.params.pageSize! * action.params.pageNumber!,
              }),
              setMoreBlogsLoadingAction({ moreBlogsLoading: false }),
            ]),
            catchError(error => {
              const message = error?.error?.errorsMessages?.[0]?.message || 'Failed to load blogs'
              return of(
                setMoreBlogsLoadingAction({ moreBlogsLoading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  // getAllBlogs$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadBlogs),
  //     concatMap(action =>
  //       concat(
  //         of(setBlogsLoadingAction({ loading: true })),
  //         this.blogService.getBlogs(action.params).pipe(
  //           mergeMap((response: BlogResponse) => {
  //             if (action.params.pageNumber === 1) {
  //               return [
  //                 setAllBlogsToState({
  //                   pagesCount: response.pagesCount,
  //                   page: response.page,
  //                   pageSize: response.pageSize,
  //                   totalCount: response.totalCount,
  //                   blogs: response.items,
  //                   hasMoreBlogs:
  //                     response.totalCount > action.params.pageSize! * action.params.pageNumber,
  //                 }),
  //                 setBlogsLoadingAction({ loading: false }),
  //               ]
  //             } else {
  //               return [
  //                 addBlogsToStateAction({
  //                   pagesCount: response.pagesCount,
  //                   page: response.page,
  //                   pageSize: response.pageSize,
  //                   totalCount: response.totalCount,
  //                   blogs: response.items,
  //                   hasMoreBlogs:
  //                     response.totalCount > action.params.pageSize! * action.params.pageNumber!,
  //                 }),
  //                 setBlogsLoadingAction({ loading: false }),
  //               ]
  //             }
  //           }),
  //           catchError(error => {
  //             const message = error?.error?.errorsMessages?.[0]?.message || 'Failed to load blogs'
  //             return of(
  //               setBlogsLoadingAction({ loading: false }),
  //               addAuthAlert({ severity: 'error', message: message })
  //             )
  //           })
  //         )
  //       )
  //     )
  //   )
  // )

  getAllBlogsForCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlogsForUser),
      concatMap(action =>
        concat(
          of(setBlogsLoadingAction({ loading: true })),
          this.blogService.getBlogsForUser(action.params).pipe(
            mergeMap((response: BlogResponse) => {
              return [
                setAllBlogsForCurrentUserToState({
                  pagesCount: response.pagesCount,
                  page: response.page,
                  pageSize: response.pageSize,
                  totalCount: response.totalCount,
                  blogsForCurrentUser: response.items,
                }),
                setBlogsLoadingAction({ loading: false }),
              ]
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

  initialLoadPostsForBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPostsForBlogs),
      filter(action => action.params.pageNumber === 1),
      concatMap(action =>
        concat(
          of(setPostsForBlogLoadingAction({ postsForBlogLoading: true })),
          this.blogService.getPostsForBlogs(action.params, action.id).pipe(
            mergeMap((response: PostResponse) => [
              setAllPostsToState({
                pagesCount: response.pagesCount,
                page: response.page,
                pageSize: response.pageSize,
                totalCount: response.totalCount,
                posts: response.items,
                hasMorePosts: response.items.length === action.params.pageSize,
              }),
              setPostsForBlogLoadingAction({ postsForBlogLoading: false }),
            ]),
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

  loadMorePostsForBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPostsForBlogs),
      filter(action => action.params.pageNumber !== undefined && action.params.pageNumber > 1),
      concatMap(action =>
        concat(
          of(setPostsLoadingAction({ loading: true })),
          this.blogService.getPostsForBlogs(action.params, action.id).pipe(
            mergeMap((response: PostResponse) => [
              addPostsToStateAction({
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
              const message =
                error?.error?.errorsMessages?.[0]?.message || 'Failed to load more blogs'
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

  addPostForBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPostForBlogAction),
      concatMap(action =>
        concat(
          of(setBlogsLoadingAction({ loading: true })),
          this.blogService
            .addPostToBlog({
              title: action.title,
              shortDescription: action.shortDescription,
              content: action.content,
              blogId: action.blogId,
              file: action.file,
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

  clearAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAuthAlert),
      delay(5000),
      map(() => deleteAuthAlert())
    )
  )
}
