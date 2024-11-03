import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IPost } from '../../../types/posts.models'

@Component({
  selector: 'blog-post-item',
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  @Input() post?: IPost
  @Input() currentUserId?: string | null
  @Input() editLink: string = '/main/posts-page/edit-post'
  @Output() likePost = new EventEmitter<string>()
  @Output() dislikePost = new EventEmitter<string>()
  @Output() itemEditSubmitted = new EventEmitter<{ postId: string; blogId: string }>()
  @Output() itemDeleteSubmitted = new EventEmitter<{ itemId: string }>()

  onEdit(data: { itemId: string }) {
    this.itemEditSubmitted.emit({ postId: data.itemId, blogId: this.post!.blogId })
  }

  onDelete(data: { itemId: string }) {
    this.itemDeleteSubmitted.emit({ itemId: data.itemId })
  }

  onLikeClick() {
    this.likePost.emit(this.post!.id)
  }

  onDislikeClick() {
    this.dislikePost.emit(this.post!.id)
  }
}
