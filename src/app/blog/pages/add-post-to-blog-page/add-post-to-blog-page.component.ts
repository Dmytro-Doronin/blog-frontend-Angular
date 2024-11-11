import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { SeverityType } from '../../../types/notification.models'
import { Store } from '@ngrx/store'
import { selectAuthAlertSeverity } from '../../../store/selectors/auth.selector'
import { selectBlogsLoading } from '../../../store/selectors/blogs.selector'
import { addPostForBlogAction } from '../../../store/actions/blogs.actions'
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'blog-add-post-to-blog-page',
  templateUrl: './add-post-to-blog-page.component.html',
  styleUrl: './add-post-to-blog-page.component.scss',
})
export class AddPostToBlogPageComponent implements OnInit {
  authSeverity$?: Observable<SeverityType | undefined>
  loading$?: Observable<boolean>
  blogId: string | null = null
  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading()
    this.blogId = this.route.snapshot.paramMap.get('id')
  }

  loading() {
    this.authSeverity$ = this.store.select(selectAuthAlertSeverity)
    this.loading$ = this.store.select(selectBlogsLoading)
  }

  onFormSubmit(data: { title: string; shortDescription: string; content: string; file: File }) {
    console.log(data.title)
    this.store.dispatch(
      addPostForBlogAction({
        title: data.title,
        shortDescription: data.shortDescription,
        content: data.content,
        blogId: this.blogId!,
        file: data.file,
      })
    )
  }
}
