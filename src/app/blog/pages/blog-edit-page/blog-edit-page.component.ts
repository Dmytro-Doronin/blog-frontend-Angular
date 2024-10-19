import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { SeverityType } from '../../../types/notification.models'
import { Store } from '@ngrx/store'
import { selectAuthAlertSeverity } from '../../../store/selectors/auth.selector'
import { selectBlogsLoading } from '../../../store/selectors/blogs.selector'
import { addBlogsAction, updateBlog } from '../../../store/actions/blogs.actions'
import { selectItemId } from '../../../store/selectors/app.selector'

@Component({
  selector: 'blog-blog-edit-page',
  templateUrl: './blog-edit-page.component.html',
  styleUrl: './blog-edit-page.component.scss',
})
export class BlogEditPageComponent implements OnInit, OnDestroy {
  authSeverity$?: Observable<SeverityType | undefined>
  loading$?: Observable<boolean>
  currentBlogId: string = ''
  private currentBlogSubscription: Subscription = new Subscription()

  constructor(private store: Store) {}

  ngOnInit() {
    this.loading()
    this.getBlogId()
    console.log('page work')
  }

  loading() {
    this.authSeverity$ = this.store.select(selectAuthAlertSeverity)
    this.loading$ = this.store.select(selectBlogsLoading)
  }

  getBlogId() {
    this.currentBlogSubscription = this.store.select(selectItemId).subscribe(item => {
      this.currentBlogId = item ?? ''
    })
  }

  onFormSubmit(data: { name: string; description: string; websiteUrl: string }) {
    this.store.dispatch(
      updateBlog({
        blogId: this.currentBlogId,
        name: data.name,
        description: data.description,
        websiteUrl: data.websiteUrl,
      })
    )
  }

  ngOnDestroy() {
    this.currentBlogSubscription.unsubscribe()
  }
}