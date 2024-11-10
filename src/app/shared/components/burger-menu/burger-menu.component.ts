import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { Store } from '@ngrx/store'

@Component({
  selector: 'blog-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('out => in', [animate('0.3s ease-in-out')]),
      transition('in => out', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class BurgerMenuComponent {
  @Input() isOpen?: boolean
  @Input() headerLoading?: boolean | null
  @Input() isAuth?: boolean | null
  @Input() userLogin?: string | null
  @Output() menuCloseSubmitted = new EventEmitter<void>()
  @Output() menuToggleSubmitted = new EventEmitter<void>()
  @Output() modalOpenSubmitted = new EventEmitter<void>()
  constructor(
    private store: Store,
    private elementRef: ElementRef
  ) {}

  get menuState() {
    return this.isOpen ? 'in' : 'out'
  }

  closeMenu() {
    this.menuCloseSubmitted.emit()
  }

  toggleMenu() {
    this.menuToggleSubmitted.emit()
  }

  modalOpen() {
    this.modalOpenSubmitted.emit()
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target)
    if (!clickedInside) {
      this.closeMenu()
    }
  }
}
