import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core'
import { IComment } from '../../../types/comments.model'
import { SeverityType } from '../../../types/notification.models'

@Component({
  selector: 'blog-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.scss',
})
export class CommentItemComponent implements OnInit, OnChanges {
  @Input() comment?: IComment
  @Input() authSeverity?: 'error' | 'success' | undefined | null
  @Input() currentUserId?: string
  @Input() commentLoading?: boolean | null
  @Input() editCommentId?: string | null
  @Output() likePost = new EventEmitter<string>()
  @Output() dislikePost = new EventEmitter<string>()
  @Output() itemEditSubmitted = new EventEmitter<{ commentId: string }>()
  @Output() itemDeleteSubmitted = new EventEmitter<{ commentId: string }>()
  isOpenForm: boolean = false

  ngOnInit(): void {
    // this.isOpenForm = this.comment?.id === this.editCommentId
    console.log('sad')
  }

  ngOnChanges(): void {
    // this.isOpenForm = this.comment?.id === this.editCommentId
  }

  onCloseForm() {
    this.isOpenForm = false
  }

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
}
