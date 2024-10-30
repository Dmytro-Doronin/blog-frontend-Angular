import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { getPostByIdAction } from '../../../store/actions/posts.action'
import { selectPost } from '../../../store/selectors/posts.selector'
import { IPost } from '../../../types/posts.models'
import { selectIsAuthenticated } from '../../../store/selectors/auth.selector'
import { selectBlogsLoading, selectCurrentBlog } from '../../../store/selectors/blogs.selector'
import { IBlog } from '../../../types/blogs.models'

@Component({
  selector: 'blog-post-page',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
})
export class PostPageComponent implements OnInit, OnDestroy {
  isAuthenticated$?: Observable<boolean>
  loading$?: Observable<boolean>
  postId: string = ''
  post: IPost | null = null
  blog$?: Observable<IBlog>
  private getPostSubscription: Subscription = new Subscription()

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
    this.postId = this.route.snapshot.paramMap.get('id') ?? ''
    this.addCurrentPost()
    this.getBlogForPost()
    this.getPost()
    this.getLoading()
    // this.store.select(selectPost).subscribe(post => {
    //   console.log(post)
    // })
  }

  getLoading() {
    this.loading$ = this.store.select(selectBlogsLoading)
  }

  getBlogForPost() {
    this.blog$ = this.store.select(selectCurrentBlog)
  }

  addCurrentPost() {
    this.store.dispatch(getPostByIdAction({ postId: this.postId }))
  }

  getPost() {
    this.getPostSubscription = this.store.select(selectPost).subscribe(post => {
      this.post = post
    })
    console.log(this.post)
  }

  ngOnDestroy() {
    this.getPostSubscription.unsubscribe()
  }
}
