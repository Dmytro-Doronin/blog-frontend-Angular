import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectBlogsLoading } from '../../../store/selectors/blogs.selector'
import { addBlogsAction } from '../../../store/actions/blogs.actions'
import { SeverityType } from '../../../types/notification.models'
import { selectAuthAlertSeverity } from '../../../store/selectors/auth.selector'

@Component({
  selector: 'blog-blog-add-page',
  templateUrl: './blog-add-page.component.html',
  styleUrl: './blog-add-page.component.scss',
})
export class BlogAddPageComponent {
  authSeverity$?: Observable<SeverityType | undefined> = this.store.select(selectAuthAlertSeverity)
  loading$?: Observable<boolean> = this.store.select(selectBlogsLoading)

  constructor(private store: Store) {}



  onFormSubmit(data: { name: string; description: string; websiteUrl: string; file: File }) {
    this.store.dispatch(
      addBlogsAction({
        name: data.name,
        description: data.description,
        websiteUrl: data.websiteUrl,
        file: data.file,
      })
    )
  }
}
