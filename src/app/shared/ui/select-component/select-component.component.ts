import { Component, OnInit, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'blog-select-component',
  templateUrl: './select-component.component.html',
  styleUrl: './select-component.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponentComponent implements OnInit {
  selectedOptions: string | null = '1'

  options = [
    { id: '1', name: 'New Blog first' },
    { id: '2', name: 'Old Blog first' },
    { id: '3', name: 'From A to Z' },
    { id: '4', name: 'From Z to A' },
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

  onChange(selected: string[]) {
    console.log('Выбранные значения:', selected)
    // Здесь можно выполнить дополнительные действия в зависимости от выбранных значений
  }
}
