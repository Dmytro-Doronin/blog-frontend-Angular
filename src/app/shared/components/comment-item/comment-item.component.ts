import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IComment } from '../../../types/comments.model'

@Component({
  selector: 'blog-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.scss',
})
export class CommentItemComponent {
  @Input() comment?: IComment
  @Output() likePost = new EventEmitter<string>()
  @Output() dislikePost = new EventEmitter<string>()

  onLikeClick() {
    this.likePost.emit(this.comment!.id)
  }

  onDislikeClick() {
    this.dislikePost.emit(this.comment!.id)
  }
}
