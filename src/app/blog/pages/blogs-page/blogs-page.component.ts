import { Component, OnInit } from '@angular/core'
import { BlogService } from '../../../core/services/blog.service'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectAccessToken } from '../../../store/selectors/auth.selector'
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'blog-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrl: './blogs-page.component.scss',
  providers: [BlogService],
})
export class BlogsPageComponent implements OnInit {
  token$?: Observable<any>
  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('Blog loaded')
  }
}
