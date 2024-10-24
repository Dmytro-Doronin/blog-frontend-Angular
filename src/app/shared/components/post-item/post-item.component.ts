import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IPost } from '../../../types/posts.models'

@Component({
  selector: 'blog-post-item',
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  @Input() post?: IPost
  @Output() likePost = new EventEmitter<string>()
  @Output() dislikePost = new EventEmitter<string>()

  onLikeClick() {
    this.likePost.emit(this.post!.id)
  }

  onDislikeClick() {
    this.dislikePost.emit(this.post!.id)
  }
}
