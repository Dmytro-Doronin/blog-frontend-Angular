import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
  selector: 'blog-item-control-menu',
  templateUrl: './item-control-menu.component.html',
  styleUrl: './item-control-menu.component.scss',
})
export class ItemControlMenuComponent {
  isOpen: boolean = false

  constructor(
    private renderer: Renderer2,
    private store: Store,
    private elementRef: ElementRef
  ) {}

  onControlMenu() {
    this.isOpen = !this.isOpen
  }

  setId() {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target)
    if (!clickedInside) {
      this.isOpen = false
    }
  }
}
