import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { SeverityType } from '../../../types/notification.models'
import { selectAuthAlertSeverity, selectUserId } from '../../../store/selectors/auth.selector'
import { selectPostsLoading } from '../../../store/selectors/posts.selector'
import { IBlog } from '../../../types/blogs.models'
import { IOptions } from '../../../types/options.models'
import { loadBlogs, loadBlogsForUser } from '../../../store/actions/blogs.actions'
import { selectBlogs, selectBlogsForCurrentUser } from '../../../store/selectors/blogs.selector'
import { PostAddToBlogModel } from '../../../types/posts.models'
import { addNewPostAction } from '../../../store/actions/posts.action'

@Component({
  selector: 'blog-add-post-page',
  templateUrl: './add-post-page.component.html',
  styleUrl: './add-post-page.component.scss',
})
export class AddPostPageComponent implements OnInit, OnDestroy {
  blogs?: IBlog[]
  authSeverity$?: Observable<SeverityType | undefined>
  loading$?: Observable<boolean>
  currentUserId?: string
  options?: IOptions[]
  private blogsSubscription: Subscription = new Subscription()
  private userIdSubscription: Subscription = new Subscription()
  constructor(private store: Store) {}

  ngOnInit() {
    this.getCurrentUserId()
    this.loadAllBlogs()
    this.getBlogs()
    this.loading()
    this.getSeverity()
  }

  loadAllBlogs() {
    this.store.dispatch(
      loadBlogsForUser({
        params: {
          pageSize: 100,
        },
      })
    )
  }

  getBlogs() {
    this.blogsSubscription = this.store.select(selectBlogsForCurrentUser).subscribe(blogs => {
      this.options = blogs.map(item => ({ id: item.id, name: item.name }))
    })
  }

  getCurrentUserId() {
    this.userIdSubscription = this.store.select(selectUserId).subscribe(userId => {
      this.currentUserId = userId
    })
  }

  loading() {
    this.loading$ = this.store.select(selectPostsLoading)
  }

  getSeverity() {
    this.authSeverity$ = this.store.select(selectAuthAlertSeverity)
  }

  onFormSubmit(data: PostAddToBlogModel) {
    console.log(data.title)
    this.store.dispatch(
      addNewPostAction({
        tittle: data.title,
        shortDescription: data.shortDescription,
        content: data.content,
        blogId: data.blogId,
      })
    )
  }

  ngOnDestroy() {
    this.userIdSubscription.unsubscribe()
    this.blogsSubscription.unsubscribe()
  }
}
