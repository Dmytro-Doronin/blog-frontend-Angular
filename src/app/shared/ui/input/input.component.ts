import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'blog-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type: string = 'text'
  @Input() placeholder: string = ''
  @Input() className: string = ''
  @Input() search: boolean = false
  @Input() variant: 'input' | 'textarea' = 'input'
  @Input() control: FormControl = new FormControl('')
}
