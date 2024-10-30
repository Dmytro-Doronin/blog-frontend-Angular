import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectIsAuthenticated } from '../../../store/selectors/auth.selector'

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
  isAuthenticated$?: Observable<boolean>

  constructor(private store: Store) {}
  ngOnInit() {
    console.log(this.status)
    this.getIsAuth()
  }

  getIsAuth() {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
  }

  onLikeClick() {
    this.likeEvent.emit()
  }

  onDislikeClick() {
    this.dislikeEvent.emit()
  }
}
