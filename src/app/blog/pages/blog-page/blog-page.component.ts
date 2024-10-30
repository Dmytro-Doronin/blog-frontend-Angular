import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
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
import { getBlogByIdAction, loadPostsForBlogs } from '../../../store/actions/blogs.actions'
import { IPost } from '../../../types/posts.models'
import { setLikeOrDislikeAction } from '../../../store/actions/posts.action'

@Component({
  selector: 'blog-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
})
export class BlogPageComponent implements OnInit, OnDestroy {
  isAuthenticated$?: Observable<boolean>
  loading$?: Observable<boolean>
  loadingForPosts$?: Observable<boolean>
  posts$?: Observable<IPost[]>
  currentUserId?: string
  blog?: IBlog
  blogId: string = ''
  pageNumber = 1
  pageSize = 5
  hasMorePostForBlog$?: Observable<boolean>
  private getBlogSubscription: Subscription = new Subscription()
  private getCurrentUserIdSubscription: Subscription = new Subscription()
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
    this.getLoadingForPost()
    this.downloadPostsForBlog()
    this.getPostsForBlog()
    this.getHasMorePostsForBlog()
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
    this.posts$ = this.store.select(selectPostsForBlogBlogModal)
  }
  getHasMorePostsForBlog() {
    this.hasMorePostForBlog$ = this.store.select(selectHasMorePostsForBlog)
  }
  getLoading() {
    this.loading$ = this.store.select(selectBlogsLoading)
  }

  getLoadingForPost() {
    this.loadingForPosts$ = this.store.select(selectPostsForBlogLoading)
  }

  addCurrentBlog() {
    this.store.dispatch(getBlogByIdAction({ blogId: this.blogId }))
  }

  getCurrentUserId() {
    this.getCurrentUserIdSubscription = this.store.select(selectUserId).subscribe(userId => {
      this.currentUserId = userId
    })
  }

  getBlog() {
    this.getBlogSubscription = this.store.select(selectCurrentBlog).subscribe(blog => {
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

  ngOnDestroy() {
    this.getBlogSubscription.unsubscribe()
    this.getCurrentUserIdSubscription.unsubscribe()
  }
}
