import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TypographyComponent } from '../../ui/typography/typography.component'

@Component({
  selector: 'blog-modal',
  standalone: true,
  imports: [TypographyComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>()
  @Input() title: string = 'HGHG'

  onClose() {
    this.closeModal.emit()
  }
}
