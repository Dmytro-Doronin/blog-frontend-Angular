import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'blog-like-icon',
  templateUrl: './like-icon.component.html',
  styleUrl: './like-icon.component.scss',
})
export class LikeIconComponent {
  @Input() status: 'like' | 'none' | 'dislike' = 'none'
  @Output() like = new EventEmitter<void>()

  onLikeClick() {
    this.like.emit()
  }
}
