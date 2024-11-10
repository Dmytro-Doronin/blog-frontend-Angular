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
export class BlogAddPageComponent implements OnInit {
  authSeverity$?: Observable<SeverityType | undefined>
  loading$?: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit() {
    this.loading()
  }

  loading() {
    this.authSeverity$ = this.store.select(selectAuthAlertSeverity)
    this.loading$ = this.store.select(selectBlogsLoading)
  }

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
