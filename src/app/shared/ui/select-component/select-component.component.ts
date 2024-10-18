import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'blog-select-component',
  templateUrl: './select-component.component.html',
  styleUrl: './select-component.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponentComponent implements OnInit {
  selectedOptions: string | null = '1'
  @Output() selectedItem = new EventEmitter<{ itemId: string }>()

  options = [
    { id: '1', name: 'New Blog first' },
    { id: '2', name: 'Old Blog first' },
    { id: 'asc', name: 'From A to Z' },
    { id: 'desc', name: 'From Z to A' },
  ]

  isOpen: boolean = false

  ngOnInit() {
    console.log(this.selectedOptions)
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
}
