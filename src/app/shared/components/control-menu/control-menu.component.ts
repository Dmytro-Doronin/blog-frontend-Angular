import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'blog-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrl: './control-menu.component.scss',
})
export class ControlMenuComponent {
  @Input() isOpen: boolean = false
  @Output() closeMenu = new EventEmitter<void>()

  close() {
    this.closeMenu.emit()
  }
}
