import { Component, EventEmitter, Input, Output } from '@angular/core'
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
