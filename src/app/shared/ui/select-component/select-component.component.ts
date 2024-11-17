import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import { IOptions } from '../../../types/options.models'

@Component({
  selector: 'blog-select-component',
  templateUrl: './select-component.component.html',
  styleUrl: './select-component.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponentComponent implements OnInit, OnChanges {
  @Input() options: IOptions[] = []
  selectedOptions?: string | null
  @Output() selectedItem = new EventEmitter<{ itemId: string }>()

  isOpen: boolean = false

  ngOnInit() {
    if (this.options.length > 0) {
      this.selectedOptions = this.options[0].id
    }
  }

  onOpen() {
    this.isOpen = true
  }

  onClose() {
    this.isOpen = false
  }

  onChange(selected: { id: string; name: string }) {
    console.log('Выбранные значения:', selected)
    this.selectedItem.emit({ itemId: selected.id })
  }

  ngOnChanges(): void {
    if (!this.selectedOptions && this.options.length > 0) {
      this.selectedOptions = this.options[0].id
      this.selectedItem.emit({ itemId: this.options[0].id })
    }
  }
}
