import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
  selector: 'blog-post-control-menu',
  templateUrl: './post-control-menu.component.html',
  styleUrl: './post-control-menu.component.scss',
})
export class PostControlMenuComponent {
  constructor(private store: Store) {}
  @Input() itemId: string = ''
  @Input() editLink: string = ''
  @Input() shouldHaveRouterLink: boolean = true

  // @Input() blogId: string = ''
  @Output() itemEditSubmitted = new EventEmitter<{ itemId: string }>()
  @Output() itemDeleteSubmitted = new EventEmitter<{ itemId: string }>()

  editItem() {
    this.itemEditSubmitted.emit({ itemId: this.itemId })
  }

  onDeleteItem() {
    this.itemDeleteSubmitted.emit({ itemId: this.itemId })
  }
  // setPostId() {
  //   this.store.dispatch(setCurrentPostId({ currentPostId: this.postId }))
  //   this.store.dispatch(setCurrentBlogId({ blogId: this.blogId }))
  // }

  // onPostDeleteModalClose() {
  //   this.store.dispatch(setCurrentPostId({ currentPostId: this.postId }))
  //   this.store.dispatch(callDeletePostModalAction({ deletePostModal: true }))
  // }
}
