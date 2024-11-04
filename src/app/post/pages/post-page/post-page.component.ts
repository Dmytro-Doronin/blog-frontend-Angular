import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { getPostByIdAction, setLikeOrDislikeAction } from '../../../store/actions/posts.action'
import { selectPost, selectPostsLoading } from '../../../store/selectors/posts.selector'
import { IPost } from '../../../types/posts.models'
import {
  selectAuthAlertSeverity,
  selectIsAuthenticated,
  selectUserId,
  selectUserLogin,
} from '../../../store/selectors/auth.selector'
import { selectCurrentBlog } from '../../../store/selectors/blogs.selector'
import { IBlog } from '../../../types/blogs.models'
import {
  deleteCommentAction,
  getCommentsForPostAction,
  sendCommentsAction,
  setEditCommentAction,
  setLikeOrDislikeForCommentAction,
  updateCommentAction,
} from '../../../store/actions/comments.action'
import {
  selectComments,
  selectCommentsLoading,
  selectEditCommentIdComment,
  selectEditCommentLoading,
  selectHasMoComment,
  selectTotalCountComments,
} from '../../../store/selectors/comments.selectoe'
import { IComment } from '../../../types/comments.model'
import { SeverityType } from '../../../types/notification.models'

@Component({
  selector: 'blog-post-page',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
})
export class PostPageComponent implements OnInit, OnDestroy {
  isAuthenticated$?: Observable<boolean>
  loading$?: Observable<boolean>
  commentsLoading$?: Observable<boolean>
  editCommentsLoading$?: Observable<boolean>
  editCommentId?: string | undefined
  totalCountComments$?: Observable<number>
  comments$?: Observable<IComment[]>
  blog$?: Observable<IBlog>
  authSeverity$?: Observable<SeverityType | undefined>
  hasMoreCommentForPost$?: Observable<boolean>
  postId: string = ''
  post: IPost | null = null
  currentUser: string = ''
  currentUserId: string = ''
  pageNumber = 1
  pageSize = 5

  private getPostSubscription: Subscription = new Subscription()
  private getCurrentUserSubscription: Subscription = new Subscription()
  private getCurrentUserIdSubscription: Subscription = new Subscription()
  private getEditCommentIdSubscription: Subscription = new Subscription()

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
    this.postId = this.route.snapshot.paramMap.get('id') ?? ''
    this.getCurrentUser()
    this.getCurrentUserId()
    this.addCurrentPost()
    this.getBlogForPost()
    this.getPost()
    this.loadComments()
    this.getComments()
    this.getLoading()
    this.getCommentsLoading()
    this.getTotalCountComments()
    this.getHasMoreComments()
    this.getAuthSeverity()
    this.getEditCommentId()
    this.getEditCommentLoading()
    // this.store.select(selectPost).subscribe(post => {
    //   console.log(post)
    // })
  }

  getEditCommentId() {
    this.getEditCommentIdSubscription = this.store
      .select(selectEditCommentIdComment)
      .subscribe(commentId => {
        this.editCommentId = commentId
      })
  }

  loadMoreComments() {
    this.pageNumber += 1
    this.loadComments()
  }
  getAuthSeverity() {
    this.authSeverity$ = this.store.select(selectAuthAlertSeverity)
  }
  getComments() {
    this.comments$ = this.store.select(selectComments)
  }
  getHasMoreComments() {
    this.hasMoreCommentForPost$ = this.store.select(selectHasMoComment)
  }
  getTotalCountComments() {
    this.totalCountComments$ = this.store.select(selectTotalCountComments)
  }

  getCommentsLoading() {
    this.commentsLoading$ = this.store.select(selectCommentsLoading)
  }

  getLoading() {
    this.loading$ = this.store.select(selectPostsLoading)
  }

  getEditCommentLoading() {
    this.editCommentsLoading$ = this.store.select(selectEditCommentLoading)
  }

  getCurrentUser() {
    this.getCurrentUserSubscription = this.store.select(selectUserLogin).subscribe(user => {
      this.currentUser = user
    })
  }
  getCurrentUserId() {
    this.getCurrentUserIdSubscription = this.store.select(selectUserId).subscribe(userId => {
      this.currentUserId = userId
    })
  }

  getBlogForPost() {
    this.blog$ = this.store.select(selectCurrentBlog)
  }

  onLikeComment(commentId: string) {
    this.store.dispatch(setLikeOrDislikeForCommentAction({ status: 'Like', commentId }))
  }

  onDislikeComment(commentId: string) {
    this.store.dispatch(setLikeOrDislikeForCommentAction({ status: 'Dislike', commentId }))
  }

  loadComments() {
    this.store.dispatch(
      getCommentsForPostAction({
        postId: this.postId,
        commentParams: {
          sortBy: 'createdAt',
          sortDirection: 'desc',
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        },
      })
    )
  }

  addCurrentPost() {
    this.store.dispatch(
      getPostByIdAction({
        postId: this.postId,
      })
    )
  }

  getPost() {
    this.getPostSubscription = this.store.select(selectPost).subscribe(post => {
      this.post = post
    })
    console.log(this.post)
  }

  onLikePost() {
    const postId = this.post?.id
    const authorName = this.currentUser
    const userId = this.currentUserId

    if (postId) {
      this.store.dispatch(setLikeOrDislikeAction({ status: 'Like', postId, authorName, userId }))
    }
  }
  onDislikePost() {
    const postId = this.post?.id
    const authorName = this.currentUser
    const userId = this.currentUserId
    if (postId) {
      this.store.dispatch(setLikeOrDislikeAction({ status: 'Dislike', postId, authorName, userId }))
    }
  }

  onAddCommentFormSubmit(data: { content: string }) {
    this.store.dispatch(sendCommentsAction({ postId: this.postId, content: data.content }))
  }

  onDeletePostInBlog(data: { commentId: string }) {
    this.store.dispatch(deleteCommentAction({ commentId: data.commentId }))
    console.log(data.commentId)
  }

  onEditPostInBlog(data: { commentId: string }) {
    this.store.dispatch(setEditCommentAction({ commentId: data.commentId }))
  }

  noCloseEditForm() {
    this.store.dispatch(setEditCommentAction({ commentId: '' }))
  }

  onFormSubmitted(data: { content: string }) {
    this.store.dispatch(
      updateCommentAction({ commentId: this.editCommentId!, content: data.content })
    )
    this.noCloseEditForm()
  }

  ngOnDestroy() {
    this.getPostSubscription.unsubscribe()
  }
}
