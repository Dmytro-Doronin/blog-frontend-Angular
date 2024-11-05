import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Component({
  selector: 'blog-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrl: './login-menu.component.scss'
})
export class LoginMenuComponent {

  @Input()isAuthenticated?: boolean | null
  @Input()userLogin?: string | null
  @Output() menuSubmitted = new EventEmitter<void>()
  isOpen: boolean = false
  constructor(private elementRef: ElementRef) {}

  onOpenCloseMenu() {
    this.isOpen = !this.isOpen
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target)
    if (!clickedInside) {
      this.isOpen = false
    }
  }
}
