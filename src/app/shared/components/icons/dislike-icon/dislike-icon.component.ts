import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'blog-dislike-icon',
  templateUrl: './dislike-icon.component.html',
  styleUrl: './dislike-icon.component.scss',
})
export class DislikeIconComponent {
  @Input() status: 'dislike' | 'none' = 'none'
  @Input() size: 'small' | 'large' = 'small'
  @Output() dislike = new EventEmitter<void>()

  onDislikeClick() {
    this.dislike.emit()
  }
}
