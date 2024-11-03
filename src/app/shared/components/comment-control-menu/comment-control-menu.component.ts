import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import { ItemControlMenuComponent } from '../item-control-menu/item-control-menu.component'

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
  @Output() closeMenu = new EventEmitter<void>()
  @ViewChild(ItemControlMenuComponent) childComponent!: ItemControlMenuComponent

  toggleChildVisibility() {
    this.childComponent.onControlMenu()
  }
  editItem() {
    this.itemEditSubmitted.emit({ itemId: this.itemId })
    this.toggleChildVisibility()
  }

  onDeleteItem() {
    this.itemDeleteSubmitted.emit({ itemId: this.itemId })
    this.toggleChildVisibility()
  }
}
