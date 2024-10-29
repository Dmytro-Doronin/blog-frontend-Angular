import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { callDeletePostModalAction, setCurrentPostId } from '../../../store/actions/posts.action'
import { setCurrentBlogId } from '../../../store/actions/blogs.actions'

@Component({
  selector: 'blog-post-control-menu',
  templateUrl: './post-control-menu.component.html',
  styleUrl: './post-control-menu.component.scss',
})
export class PostControlMenuComponent {
  constructor(private store: Store) {}
  @Input() postId: string = ''
  @Input() blogId: string = ''

  setPostId() {
    this.store.dispatch(setCurrentPostId({ currentPostId: this.postId }))
    this.store.dispatch(setCurrentBlogId({ blogId: this.blogId }))
  }

  onPostDeleteModalClose() {
    this.store.dispatch(setCurrentPostId({ currentPostId: this.postId }))
    this.store.dispatch(callDeletePostModalAction({ deletePostModal: true }))
  }
}
