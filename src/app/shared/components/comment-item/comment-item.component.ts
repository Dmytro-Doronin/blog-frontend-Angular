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
  @Input() editCommentLoading?: boolean | null
  @Output() likePost = new EventEmitter<string>()
  @Output() dislikePost = new EventEmitter<string>()
  @Output() itemEditSubmitted = new EventEmitter<{ commentId: string }>()
  @Output() itemDeleteSubmitted = new EventEmitter<{ commentId: string }>()
  @Output() closeEditForm = new EventEmitter<void>()
  @Output() formSubmitted = new EventEmitter<{ content: string }>()
  isOpenForm: boolean = false

  ngOnInit(): void {
    // this.isOpenForm = this.comment?.id === this.editCommentId
    console.log('sad')
  }

  ngOnChanges(): void {
    this.isOpenForm = this.comment?.id === this.editCommentId
  }

  onCloseForm() {
    this.isOpenForm = false
    this.closeEditForm.emit()
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

  onFormItemSubmit(data: { content: string }) {
    this.formSubmitted.emit({ content: data.content })
  }
}
