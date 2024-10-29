import {Component, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {setItemId} from "../../../store/actions/app.actions";
import {callDeleteBlogModalAction, setCurrentBlogId} from "../../../store/actions/blogs.actions";
import {callDeletePostModalAction, setCurrentPostId} from "../../../store/actions/posts.action";

@Component({
  selector: 'blog-post-control-menu',
  templateUrl: './post-control-menu.component.html',
  styleUrl: './post-control-menu.component.scss'
})
export class PostControlMenuComponent {
  constructor(private store: Store) {}
  @Input() postId: string = ''

  setPostId() {
    this.store.dispatch(setItemId({ itemId: this.postId }))
  }

  onPostDeleteModalClose() {
    this.store.dispatch(setCurrentPostId({ currentPostId: this.postId }))
    this.store.dispatch(callDeletePostModalAction({ deletePostModal: true }))
  }
}
