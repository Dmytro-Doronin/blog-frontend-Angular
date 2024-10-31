import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { getPostByIdAction, setLikeOrDislikeAction } from '../../../store/actions/posts.action'
import { selectPost } from '../../../store/selectors/posts.selector'
import { IPost } from '../../../types/posts.models'
import {
  selectIsAuthenticated,
  selectUserId,
  selectUserLogin,
} from '../../../store/selectors/auth.selector'
import { selectBlogsLoading, selectCurrentBlog } from '../../../store/selectors/blogs.selector'
import { IBlog } from '../../../types/blogs.models'
import { sendCommentsAction } from '../../../store/actions/comments.action'

@Component({
  selector: 'blog-post-page',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
})
export class PostPageComponent implements OnInit, OnDestroy {
  isAuthenticated$?: Observable<boolean>
  loading$?: Observable<boolean>
  postId: string = ''
  post: IPost | null = null
  currentUser: string = ''
  currentUserId: string = ''
  blog$?: Observable<IBlog>
  private getPostSubscription: Subscription = new Subscription()
  private getCurrentUserSubscription: Subscription = new Subscription()
  private getCurrentUserIdSubscription: Subscription = new Subscription()

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
    this.getLoading()
    // this.store.select(selectPost).subscribe(post => {
    //   console.log(post)
    // })
  }

  getLoading() {
    this.loading$ = this.store.select(selectBlogsLoading)
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

  addCurrentPost() {
    this.store.dispatch(getPostByIdAction({ postId: this.postId }))
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

  ngOnDestroy() {
    this.getPostSubscription.unsubscribe()
  }
}
