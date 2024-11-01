import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'blog-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type: string = 'text'
  @Input() placeholder: string = ''
  @Input() isControl: boolean = false
  @Input() className: string = ''
  @Input() search: boolean = false
  @Input() variant: 'input' | 'textarea' | 'textarea-comment' = 'input'
  @Input() control: FormControl = new FormControl('')
  @Output() valueChange: EventEmitter<string> = new EventEmitter()
  @Output() searchFocus: EventEmitter<void> = new EventEmitter()
  inputValue: string = ''

  onInputChange() {
    this.valueChange.emit(this.inputValue)
  }

  onSearchFocus() {
    this.searchFocus.emit()
  }
}
