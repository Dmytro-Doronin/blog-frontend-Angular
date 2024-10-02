import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TypographyComponent } from '../../ui/typography/typography.component'

@Component({
  selector: 'blog-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>()
  @Input() title: string = ''

  onClose() {
    this.closeModal.emit()
  }
}
