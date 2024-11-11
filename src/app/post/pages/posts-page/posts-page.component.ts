import { Component, OnDestroy, OnInit } from '@angular/core'
import { postsOptions } from '../../../data/options'
import {
  callDeletePostModalAction,
  deletePost,
  loadPosts,
  setCurrentPostId,
  setLikeOrDislikeAction,
  setSortByAlphabetForPost,
  setSortByDateForPost,
} from '../../../store/actions/posts.action'
import { Store } from '@ngrx/store'
import { IPost } from '../../../types/posts.models'
import { Observable, Subscription } from 'rxjs'
import {
  selectCurrentPostId,
  selectDeletePostModal,
  selectHasMorePosts,
  selectPosts,
  selectPostsLoading,
  selectSortParamsForPosts,
} from '../../../store/selectors/posts.selector'
import { selectIsAuthenticated, selectUserId } from '../../../store/selectors/auth.selector'
import { setCurrentBlogId } from '../../../store/actions/blogs.actions'

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
  currentUserId$?: Observable<string>
  openDeleteModal$?: Observable<boolean>
  postToDeleteId: string = ''
  pageNumber = 1
  pageSize = 5
  sortBy: string = 'createdAt'
  sortDirection: 'asc' | 'desc' = 'desc'

  protected readonly postsOptions = postsOptions
  private sortDataSubscription: Subscription = new Subscription()
  private currentPostIdSubscription: Subscription = new Subscription()
  constructor(private store: Store) {}

  ngOnInit() {
    this.getCurrentUser()
    this.getSortData()
    this.loadPosts()
    this.getPosts()
    this.getLoading()
    this.getHasMorePosts()
    this.getIsAuthenticated()
    this.getOpenDeleteModal()
    this.getCurrentPostId()
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
  }
  getIsAuthenticated() {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
  }

  getPosts() {
    this.posts$ = this.store.select(selectPosts)
    this.posts$.subscribe(item => console.log(item))
  }

  getCurrentUser() {
    this.currentUserId$ = this.store.select(selectUserId)
  }

  getLoading() {
    this.loading$ = this.store.select(selectPostsLoading)
  }

  onLikePost(postId: string) {
    this.store.dispatch(setLikeOrDislikeAction({ status: 'Like', postId }))
  }

  onDislikePost(postId: string) {
    this.store.dispatch(setLikeOrDislikeAction({ status: 'Dislike', postId }))
  }

  getOpenDeleteModal() {
    this.openDeleteModal$ = this.store.select(selectDeletePostModal)
  }

  getCurrentPostId() {
    this.currentPostIdSubscription = this.store.select(selectCurrentPostId).subscribe(postId => {
      this.postToDeleteId = postId
    })
  }

  onDeletePost(data: { itemId: string }) {
    this.store.dispatch(setCurrentPostId({ currentPostId: data.itemId }))
    this.store.dispatch(callDeletePostModalAction({ deletePostModal: true }))
  }

  onEditPost(data: { postId: string; blogId: string }) {
    this.store.dispatch(setCurrentPostId({ currentPostId: data.postId }))
    this.store.dispatch(setCurrentBlogId({ blogId: data.blogId }))
  }

  deletePost() {
    this.store.dispatch(deletePost({ postId: this.postToDeleteId }))
    this.store.dispatch(callDeletePostModalAction({ deletePostModal: false }))
  }

  onCloseModal() {
    this.store.dispatch(callDeletePostModalAction({ deletePostModal: false }))
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
    this.currentPostIdSubscription.unsubscribe()
  }
}
