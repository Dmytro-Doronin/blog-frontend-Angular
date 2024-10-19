import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import {
  selectIsAuthenticated,
  selectUserId,
  selectUserLogin,
} from '../../../store/selectors/auth.selector'
import {
  callDeleteBlogModalAction,
  deleteBlog,
  loadBlogs,
  setSortByAlphabet,
  setSortByDate,
} from '../../../store/actions/blogs.actions'
import {
  selectBlogs,
  selectBlogsLoading,
  selectCurrentBlogId,
  selectDeleteBlogModal,
  selectHasMoreBlogs,
  selectSortParams,
} from '../../../store/selectors/blogs.selector'
import { Router } from '@angular/router'
import { IBlog } from '../../../types/blogs.models'

@Component({
  selector: 'blog-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrl: './blogs-page.component.scss',
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
  sortBy: string = 'createdAt'
  sortDirection: 'asc' | 'desc' = 'desc'
  private currentBlogIdSubscription: Subscription = new Subscription()
  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading()
    this.loadBlogs()
    this.getCurrentUser()
    this.getBlog()
    this.getHasMoreBlog()
    this.getOpenDeleteModal()
    this.getCurrentBlogId()
    this.getSortData()
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
    this.store.select(selectUserId).subscribe(userId => {
      console.log('User ID from store:', userId)
    })
    this.currentUserId$!.subscribe(item => {
      console.log('currentUserId:', item)
    })
  }

  loadBlogs() {
    this.store.dispatch(
      loadBlogs({
        params: {
          searchNameTerm: '',
          sortBy: this.sortBy,
          sortDirection: this.sortDirection,
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

  getSortData() {
    this.store.select(selectSortParams).subscribe(sortParams => {
      this.sortBy = sortParams.sortBy
      this.sortDirection = sortParams.sortDirection
      console.log(this.sortBy, this.sortDirection)
    })
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
    this.store.dispatch(callDeleteBlogModalAction({ deleteBlogModal: false }))
  }

  deleteBlog() {
    this.store.dispatch(deleteBlog({ blogId: this.blogToDeleteId }))
    this.store.dispatch(callDeleteBlogModalAction({ deleteBlogModal: false }))
  }

  editBlog(blogId: string) {
    this.router.navigate(['/main/blogs-page/edit-blog', blogId])
  }

  onSortChge(item: { itemId: string }) {
    if (item.itemId === '1') {
      this.store.dispatch(setSortByDate({ sortBy: 'createdAt', sortDirection: 'desc' }))
    } else if (item.itemId === '2') {
      this.store.dispatch(setSortByDate({ sortBy: 'createdAt', sortDirection: 'asc' }))
    } else if (item.itemId === 'asc' || item.itemId === 'desc') {
      this.store.dispatch(setSortByAlphabet({ sortDirection: item.itemId }))
    }
    this.pageNumber = 1
    this.loadBlogs()
  }

  ngOnDestroy() {
    this.currentBlogIdSubscription.unsubscribe()
  }
}
