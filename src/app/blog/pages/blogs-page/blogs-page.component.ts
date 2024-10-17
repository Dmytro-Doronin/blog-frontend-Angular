import {Component, OnDestroy, OnInit} from '@angular/core'
import { BlogService } from '../../../core/services/blog.service'
import {Observable, Subscription} from 'rxjs'
import { Store } from '@ngrx/store'
import {
  selectAccessToken,
  selectIsAuthenticated,
  selectUserId,
  selectUserLogin,
} from '../../../store/selectors/auth.selector'
import { AuthService } from '../../../core/services/auth.service'
import {addBlogsAction, callDeleteBlogModalAction, deleteBlog, loadBlogs} from '../../../store/actions/blogs.actions'
import {
  selectBlogs,
  selectBlogsLoading, selectCurrentBlogId, selectDeleteBlogModal,
  selectHasMoreBlogs,
} from '../../../store/selectors/blogs.selector'
import { Router } from '@angular/router'
import {IBlog} from "../../../types/blogs.models";

@Component({
  selector: 'blog-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrl: './blogs-page.component.scss',
  providers: [BlogService],
})
export class BlogsPageComponent implements OnInit, OnDestroy {
  blogs$?: Observable<IBlog[]>
  isAuthenticated$?: Observable<boolean>
  loading$?: Observable<boolean>
  currentUserId$?: Observable<string>
  currentUserName$?: Observable<string>
  hasMoreBlogs$?: Observable<boolean>
  openDeleteModal$?: Observable<boolean>
  blogToDeleteId: string = ''
  pageNumber = 1
  pageSize = 5
  private currentBlogIdSubscription: Subscription = new Subscription()
  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading()
    this.loadBlogs()
    this.getCurrentUser()
    this.getBlog()
    this.getHasMoreBlog()
    this.getOpenDeleteModal()
    this.getCurrentBlogId()
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

  getBlog() {
    this.blogs$ = this.store.select(selectBlogs)
  }

  getCurrentBlogId() {
    this.currentBlogIdSubscription = this.store.select(selectCurrentBlogId).subscribe(blogId => {
      this.blogToDeleteId = blogId
    })
  }
  getHasMoreBlog() {
    this.hasMoreBlogs$ = this.store.select(selectHasMoreBlogs)
  }

  loading() {
    this.loading$ = this.store.select(selectBlogsLoading)
  }

  getOpenDeleteModal() {
    this.openDeleteModal$ = this.store.select(selectDeleteBlogModal)
  }

  loadMore() {
    this.pageNumber += 1
    this.loadBlogs()
  }

  onCloseModal() {
    this.store.dispatch(callDeleteBlogModalAction({deleteBlogModal: false}))
  }

  deleteBlog() {
    this.store.dispatch(deleteBlog({blogId: this.blogToDeleteId}))
    this.store.dispatch(callDeleteBlogModalAction({deleteBlogModal: false}))
  }

  editBlog(blogId: string) {
    this.router.navigate(['/main/blogs-page/edit-blog', blogId])
  }

  ngOnDestroy() {
    this.currentBlogIdSubscription.unsubscribe()
  }
}
