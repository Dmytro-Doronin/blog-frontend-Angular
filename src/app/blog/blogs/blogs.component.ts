import { Component, OnInit } from '@angular/core'
import { BlogService } from '../../core/services/blog.service'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectAccessToken } from '../../store/selectors/auth.selector'

@Component({
  standalone: true,
  selector: 'blog-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  providers: [BlogService],
})
export class BlogsComponent implements OnInit {
  token$?: Observable<any>
  constructor(
    private blogService: BlogService,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('Blog loaded')
  }

  loadBlog() {
    this.token$ = this.store.select(selectAccessToken)
    this.token$.subscribe(token => {
      console.log(token)
    })
    this.blogService.getBlogs().subscribe(ans => {
      console.log(ans)
    })
  }
}
