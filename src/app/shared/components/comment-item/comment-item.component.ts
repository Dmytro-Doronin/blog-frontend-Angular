import { Component, Input } from '@angular/core'
import { IComment } from '../../../types/comments.model'

@Component({
  selector: 'blog-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.scss',
})
export class CommentItemComponent {
  @Input() comment?: IComment
}
