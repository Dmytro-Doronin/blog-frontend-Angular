import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'blog-like-dislike',
  templateUrl: './like-dislike.component.html',
  styleUrl: './like-dislike.component.scss',
})
export class LikeDislikeComponent implements OnInit {
  @Input() status: 'None' | 'Like' | 'Dislike' = 'None'
  @Input() likesCount: number = 0
  @Input() dislikesCount: number = 0
  @Output() likeEvent = new EventEmitter<string>()
  @Output() dislikeEvent = new EventEmitter<string>()

  ngOnInit() {
    console.log(this.status)
  }

  onLikeClick() {
    this.likeEvent.emit()
  }

  onDislikeClick() {
    this.dislikeEvent.emit()
  }
}
