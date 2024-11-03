import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IComment } from '../../../types/comments.model'

@Component({
  selector: 'blog-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.scss',
})
export class CommentItemComponent implements OnInit {
  @Input() comment?: IComment
  @Input() currentUserId?: string
  @Input() editCommentId?: string | null
  @Output() likePost = new EventEmitter<string>()
  @Output() dislikePost = new EventEmitter<string>()
  @Output() itemEditSubmitted = new EventEmitter<{ commentId: string }>()
  @Output() itemDeleteSubmitted = new EventEmitter<{ commentId: string }>()

  onEdit(data: { itemId: string }) {
    this.itemEditSubmitted.emit({ commentId: this.comment!.id })
  }

  onDelete(data: { itemId: string }) {
    this.itemDeleteSubmitted.emit({ commentId: this.comment!.id })
  }

  onLikeClick() {
    this.likePost.emit(this.comment!.id)
  }

  onDislikeClick() {
    this.dislikePost.emit(this.comment!.id)
  }

  ngOnInit(): void {
    console.log(this.editCommentId)
  }
}
