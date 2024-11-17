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
  loadSearchBlogs,
  setBlogsSearchAction,
  setSortByAlphabetForBlog,
  setSortByDateForBlog,
} from '../../../store/actions/blogs.actions'
import {
  selectBlogForSearchLoading,
  selectBlogs,
  selectBlogsLoading,
  selectCurrentBlogId,
  selectDeleteBlogModal,
  selectHasMoreBlogs,
  selectMoreBlogsLoading,
  selectSearchBlogs,
  selectSortParams,
} from '../../../store/selectors/blogs.selector'
import { IBlog } from '../../../types/blogs.models'
import { blogOptions } from '../../../data/options'
import { deletePost } from '../../../store/actions/posts.action'

@Component({
  selector: 'blog-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrl: './blogs-page.component.scss',
})
export class BlogsPageComponent implements OnInit, OnDestroy {
  blogs$?: Observable<IBlog[]>
  blogsForSearch$?: Observable<IBlog[]>
  isAuthenticated$?: Observable<boolean>
  loading$?: Observable<boolean>
  loadingMoreBlogs$?: Observable<boolean>
  currentUserId$?: Observable<string>
  currentUserName$?: Observable<string>
  hasMoreBlogs$?: Observable<boolean>
  openDeleteModal$?: Observable<boolean>
  searchLoading$?: Observable<boolean>
  blogToDeleteId: string = ''
  pageNumber = 1
  pageSize = 5
  sortBy: string = 'createdAt'
  sortDirection: 'asc' | 'desc' = 'desc'
  blogSearchTerm: string = ''
  private currentBlogIdSubscription: Subscription = new Subscription()
  private sortDataSubscription: Subscription = new Subscription()
  constructor(private store: Store) {}

  ngOnInit() {
    this.loading()
    this.getMoreBlogsLoading()
    this.loadBlogs()
    this.getCurrentUser()
    this.getBlog()
    this.getHasMoreBlog()
    this.getOpenDeleteModal()
    this.getCurrentBlogId()
    this.getSortData()
    this.getBlogsForSearch()
    this.getBlogsForSearchLoading()
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
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

  loadBlogsForSearch() {
    this.store.dispatch(
      loadSearchBlogs({
        params: {
          searchNameTerm: this.blogSearchTerm,
          sortBy: 'createdAt',
          sortDirection: 'desc',
          pageNumber: 1,
          pageSize: 10,
        },
      })
    )
  }

  onSearchTermChange(value: string) {
    this.blogSearchTerm = value
    if (this.blogSearchTerm.length === 0) {
      this.store.dispatch(setBlogsSearchAction({ blogsForSearch: [] }))
      this.loadBlogsForSearch()
    } else {
      this.loadBlogsForSearch()
    }
    // if (value.length > 2) {
    //   this.store.dispatch(setBlogsSearchTermAction({ searchTerm: value }))
    // }
  }

  getBlogsForSearch() {
    this.blogsForSearch$ = this.store.select(selectSearchBlogs)
  }
  getBlogsForSearchLoading() {
    this.searchLoading$ = this.store.select(selectBlogForSearchLoading)
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
    this.sortDataSubscription = this.store.select(selectSortParams).subscribe(sortParams => {
      this.sortBy = sortParams.sortBy
      this.sortDirection = sortParams.sortDirection
    })
  }

  loading() {
    this.loading$ = this.store.select(selectBlogsLoading)
  }

  getMoreBlogsLoading() {
    this.loadingMoreBlogs$ = this.store.select(selectMoreBlogsLoading)
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

  onSortChge(item: { itemId: string }) {
    if (item.itemId === '1') {
      this.store.dispatch(setSortByDateForBlog({ sortBy: 'createdAt', sortDirection: 'desc' }))
    } else if (item.itemId === '2') {
      this.store.dispatch(setSortByDateForBlog({ sortBy: 'createdAt', sortDirection: 'asc' }))
    } else if (item.itemId === 'asc' || item.itemId === 'desc') {
      this.store.dispatch(setSortByAlphabetForBlog({ sortDirection: item.itemId }))
    }
    this.pageNumber = 1
    this.loadBlogs()
  }

  ngOnDestroy() {
    this.currentBlogIdSubscription.unsubscribe()
    this.sortDataSubscription.unsubscribe()
  }

  protected readonly blogOptions = blogOptions
  protected readonly deletePost = deletePost
}
