import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
  selector: 'blog-comment-control-menu',
  templateUrl: './comment-control-menu.component.html',
  styleUrl: './comment-control-menu.component.scss',
})
export class CommentControlMenuComponent {
  constructor(private store: Store) {}
  @Input() itemId: string = ''
  @Output() itemEditSubmitted = new EventEmitter<{ itemId: string }>()
  @Output() itemDeleteSubmitted = new EventEmitter<{ itemId: string }>()

  editItem() {
    this.itemEditSubmitted.emit({ itemId: this.itemId })
  }

  onDeleteItem() {
    this.itemDeleteSubmitted.emit({ itemId: this.itemId })
  }
}
