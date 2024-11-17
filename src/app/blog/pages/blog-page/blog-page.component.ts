import { Component, OnDestroy, OnInit } from '@angular/core'
import { distinctUntilChanged, Observable, Subscription } from 'rxjs'
import { selectIsAuthenticated, selectUserId } from '../../../store/selectors/auth.selector'
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { IBlog } from '../../../types/blogs.models'
import {
  selectBlogsLoading,
  selectCurrentBlog,
  selectHasMorePostsForBlog,
  selectPostsForBlogBlogModal,
  selectPostsForBlogLoading,
} from '../../../store/selectors/blogs.selector'
import {
  getBlogByIdAction,
  loadPostsForBlogs,
  setCurrentBlogId,
} from '../../../store/actions/blogs.actions'
import { deletePost } from '../../../store/actions/posts.action'
import { IPost } from '../../../types/posts.models'
import {
  callDeletePostModalAction,
  setCurrentPostId,
  setLikeOrDislikeAction,
} from '../../../store/actions/posts.action'
import {
  selectCurrentPostId,
  selectDeletePostModal,
  selectHasMorePosts,
  selectPost,
  selectPosts,
  selectPostsLoading,
} from '../../../store/selectors/posts.selector'

@Component({
  selector: 'blog-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
})
export class BlogPageComponent implements OnInit, OnDestroy {
  isAuthenticated$?: Observable<boolean>
  loading$?: Observable<boolean>
  loadingForPosts$?: Observable<boolean>
  loadingForGetAllPostsInBlog$?: Observable<boolean>
  posts$?: Observable<IPost[]>
  openDeleteModal$?: Observable<boolean>

  currentUserId?: string
  blog?: IBlog
  blogId: string = ''
  postToDeleteId: string = ''
  // editPostLink = '/main/posts-page/edit-post'
  pageNumber = 1
  pageSize = 5
  hasMorePostForBlog$?: Observable<boolean>
  private getBlogSubscription: Subscription = new Subscription()
  private getCurrentUserIdSubscription: Subscription = new Subscription()
  private currentPostIdSubscription: Subscription = new Subscription()

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
    this.blogId = this.route.snapshot.paramMap.get('id') ?? ''
    this.addCurrentBlog()
    this.getCurrentUserId()
    this.getBlog()
    this.getLoading()
    this.getLoadingForPosts()
    this.getLoadingForAllPosts()
    this.downloadPostsForBlog()
    this.getPostsForBlog()
    this.getHasMorePostsForBlog()
    this.getCurrentPostId()
    this.getOpenDeletePostModal()
  }

  downloadPostsForBlog() {
    this.store.dispatch(
      loadPostsForBlogs({
        params: {
          sortBy: 'createdAt',
          sortDirection: 'desc',
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        },
        id: this.blogId,
      })
    )
  }

  getPostsForBlog() {
    this.posts$ = this.store.select(selectPosts)
  }
  getHasMorePostsForBlog() {
    this.hasMorePostForBlog$ = this.store.select(selectHasMorePosts)
  }
  getLoading() {
    this.loading$ = this.store.select(selectBlogsLoading)
    this.loading$.subscribe()
  }

  getLoadingForPosts() {
    this.loadingForPosts$ = this.store.select(selectPostsLoading)
  }

  getLoadingForAllPosts() {
    this.loadingForGetAllPostsInBlog$ = this.store.select(selectPostsForBlogLoading)
  }

  addCurrentBlog() {
    this.store.dispatch(getBlogByIdAction({ blogId: this.blogId }))
  }

  getCurrentUserId() {
    this.getCurrentUserIdSubscription = this.store.select(selectUserId).subscribe(userId => {
      this.currentUserId = userId
    })
  }
  getOpenDeletePostModal() {
    this.openDeleteModal$ = this.store.select(selectDeletePostModal)
  }
  getCurrentPostId() {
    this.currentPostIdSubscription = this.store.select(selectCurrentPostId).subscribe(postId => {
      this.postToDeleteId = postId
    })
  }

  getBlog() {
    this.store
      .select(selectCurrentBlog)
      .pipe(distinctUntilChanged())
      .subscribe(blog => {
        this.blog = blog
      })
  }

  loadMorePosts() {
    this.pageNumber += 1
    this.downloadPostsForBlog()
  }

  onLikePost(postId: string) {
    this.store.dispatch(setLikeOrDislikeAction({ status: 'Like', postId }))
  }

  onDislikePost(postId: string) {
    this.store.dispatch(setLikeOrDislikeAction({ status: 'Dislike', postId }))
  }

  onDeletePostInBlog(data: { itemId: string }) {
    this.store.dispatch(setCurrentPostId({ currentPostId: data.itemId }))
    this.store.dispatch(setCurrentBlogId({ blogId: this.blogId }))
    this.store.dispatch(callDeletePostModalAction({ deletePostModal: true }))
  }

  onEditPostInBlog(data: { postId: string; blogId: string }) {
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

  ngOnDestroy() {
    this.getBlogSubscription.unsubscribe()
    this.getCurrentUserIdSubscription.unsubscribe()
  }

  protected readonly selectCurrentBlog = selectCurrentBlog
}
