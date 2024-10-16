import { Component, OnInit } from '@angular/core'
import { BlogService } from '../../../core/services/blog.service'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import {
  selectAccessToken,
  selectIsAuthenticated,
  selectUserId,
  selectUserLogin,
} from '../../../store/selectors/auth.selector'
import { AuthService } from '../../../core/services/auth.service'
import { addBlogsAction, loadBlogs } from '../../../store/actions/blogs.actions'
import {
  selectBlogs,
  selectBlogsLoading,
  selectHasMoreBlogs,
} from '../../../store/selectors/blogs.selector'

@Component({
  selector: 'blog-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrl: './blogs-page.component.scss',
  providers: [BlogService],
})
export class BlogsPageComponent implements OnInit {
  blogs$ = this.store.select(selectBlogs)
  isAuthenticated$?: Observable<boolean>
  loading$?: Observable<boolean>
  currentUserId$?: Observable<string>
  currentUserName$?: Observable<string>
  hasMoreBlogs$ = this.store.select(selectHasMoreBlogs)
  pageNumber = 1
  pageSize = 5
  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loading()
    this.loadBlogs()
    this.getCurrentUser()
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
  }

  loadBlogs() {
    this.store.dispatch(
      loadBlogs({
        params: {
          searchNameTerm: '',
          sortBy: 'createdAt',
          sortDirection: 'asc',
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        },
      })
    )
  }

  getCurrentUser() {
    this.currentUserId$ = this.store.select(selectUserId)
    this.currentUserName$ = this.store.select(selectUserLogin)
  }

  loading() {
    this.loading$ = this.store.select(selectBlogsLoading)
  }

  loadMore() {
    this.pageNumber += 1
    this.loadBlogs()
  }
}
