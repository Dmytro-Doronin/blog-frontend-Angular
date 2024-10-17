import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { setItemId } from '../../../store/actions/app.actions'
import {callDeleteBlogModalAction, setCurrentBlogId} from "../../../store/actions/blogs.actions";

@Component({
  selector: 'blog-blog-control-menu',
  templateUrl: './blog-control-menu.component.html',
  styleUrl: './blog-control-menu.component.scss',
})
export class BlogControlMenuComponent {
  constructor(private store: Store) {}
  @Input() blogId: string = ''

  setBlogId() {
    this.store.dispatch(setItemId({ itemId: this.blogId }))
  }

  onBlogDeleteModalClose() {
    this.store.dispatch(setCurrentBlogId({ blogId: this.blogId }))
    this.store.dispatch(callDeleteBlogModalAction({deleteBlogModal: true}))
  }
}
