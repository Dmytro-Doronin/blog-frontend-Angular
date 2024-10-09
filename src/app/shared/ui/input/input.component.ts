import { Component, Input } from '@angular/core'

@Component({
  selector: 'blog-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type: string = 'text'
  @Input() placeholder: string = ''
  @Input() className: string = ''
}
