import { Component, OnDestroy, OnInit } from '@angular/core'
import { postsOptions } from '../../../data/options'
import {
  loadPosts,
  setLikeOrDislikeAction,
  setSortByAlphabetForPost,
  setSortByDateForPost,
} from '../../../store/actions/posts.action'
import { Store } from '@ngrx/store'
import { IPost } from '../../../types/posts.models'
import { Observable, Subscription } from 'rxjs'
import {
  selectHasMorePosts,
  selectPosts,
  selectPostsLoading,
  selectSortParamsForPosts,
} from '../../../store/selectors/posts.selector'
import { selectIsAuthenticated } from '../../../store/selectors/auth.selector'

@Component({
  selector: 'blog-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
})
export class PostsPageComponent implements OnInit, OnDestroy {
  posts$?: Observable<IPost[]>
  isAuthenticated$?: Observable<boolean>
  hasMorePosts$?: Observable<boolean>
  loading$?: Observable<boolean>
  pageNumber = 1
  pageSize = 5
  sortBy: string = 'createdAt'
  sortDirection: 'asc' | 'desc' = 'desc'

  protected readonly postsOptions = postsOptions
  private sortDataSubscription: Subscription = new Subscription()
  constructor(private store: Store) {}

  ngOnInit() {
    this.getSortData()
    this.loadPosts()
    this.getPosts()
    this.getLoading()
    this.getHasMorePosts()
    this.getIsAuthenticated()
  }

  loadPosts() {
    this.store.dispatch(
      loadPosts({
        params: {
          sortBy: this.sortBy,
          sortDirection: this.sortDirection,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        },
      })
    )
  }

  loadMorePosts() {
    this.pageNumber += 1
    this.loadPosts()
  }

  getHasMorePosts() {
    this.hasMorePosts$ = this.store.select(selectHasMorePosts)
    this.hasMorePosts$.subscribe(item => console.log(item))
  }
  getIsAuthenticated() {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
  }

  getPosts() {
    this.posts$ = this.store.select(selectPosts)
  }

  getLoading() {
    this.loading$ = this.store.select(selectPostsLoading)
  }

  onLikePost(postId: string) {
    this.store.dispatch(setLikeOrDislikeAction({ status: 'Like', postId }))
    console.log(postId)
  }

  onDislikePost(postId: string) {
    this.store.dispatch(setLikeOrDislikeAction({ status: 'Dislike', postId }))
  }

  getSortData() {
    this.sortDataSubscription = this.store
      .select(selectSortParamsForPosts)
      .subscribe(sortParams => {
        this.sortBy = sortParams.sortBy
        this.sortDirection = sortParams.sortDirection
      })
  }

  onSortChge(item: { itemId: string }) {
    if (item.itemId === '1') {
      this.store.dispatch(setSortByDateForPost({ sortBy: 'createdAt', sortDirection: 'desc' }))
    } else if (item.itemId === '2') {
      this.store.dispatch(setSortByDateForPost({ sortBy: 'createdAt', sortDirection: 'asc' }))
    } else if (item.itemId === 'asc' || item.itemId === 'desc') {
      this.store.dispatch(setSortByAlphabetForPost({ sortDirection: item.itemId }))
    }
    this.pageNumber = 1
    this.loadPosts()
  }

  ngOnDestroy() {
    this.sortDataSubscription.unsubscribe()
  }
}
