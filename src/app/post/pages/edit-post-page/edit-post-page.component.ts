import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { SeverityType } from '../../../types/notification.models'
import { Store } from '@ngrx/store'
import { selectAuthAlertSeverity } from '../../../store/selectors/auth.selector'
import { selectCurrentBlogId } from '../../../store/selectors/blogs.selector'

import { selectCurrentPostId, selectPostsLoading } from '../../../store/selectors/posts.selector'
import { updatePost } from '../../../store/actions/posts.action'

@Component({
  selector: 'blog-edit-post-page',
  templateUrl: './edit-post-page.component.html',
  styleUrl: './edit-post-page.component.scss',
})
export class EditPostPageComponent implements OnInit, OnDestroy {
  authSeverity$?: Observable<SeverityType | undefined>
  loading$?: Observable<boolean>
  currentPosId: string = ''
  currentBlogId: string = ''
  private currentPostSubscription: Subscription = new Subscription()
  private currentBlogSubscription: Subscription = new Subscription()

  constructor(private store: Store) {}

  ngOnInit() {
    this.loading()
    this.getPostId()
    this.getCurrentBlogId()
    console.log('page work')
  }

  loading() {
    this.authSeverity$ = this.store.select(selectAuthAlertSeverity)
    this.loading$ = this.store.select(selectPostsLoading)
  }

  getPostId() {
    this.currentPostSubscription = this.store.select(selectCurrentPostId).subscribe(postId => {
      this.currentPosId = postId
      console.log(postId)
    })
  }

  getCurrentBlogId() {
    this.currentBlogSubscription = this.store.select(selectCurrentBlogId).subscribe(blogId => {
      this.currentBlogId = blogId ?? ''
    })
  }

  onFormSubmit(data: {
    title: string
    shortDescription: string
    content: string
    file: File | null
  }) {
    this.store.dispatch(
      updatePost({
        postId: this.currentPosId,
        title: data.title,
        shortDescription: data.shortDescription,
        content: data.content,
        blogId: this.currentBlogId,
        file: data.file,
      })
    )
  }

  ngOnDestroy() {
    this.currentPostSubscription.unsubscribe()
    this.currentBlogSubscription.unsubscribe()
  }
}
