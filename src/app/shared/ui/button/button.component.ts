import { Component, Input } from '@angular/core'

@Component({
  selector: 'blog-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant: 'Primary' | 'Secondary' | 'Tertiary' | 'Back' = 'Primary'
  @Input() tag: 'button' | 'link' = 'button'
  @Input() type: string = 'submit'
  @Input() content: string = ''
  @Input() disabled?: boolean = false
  @Input() fullWidth?: boolean = false
  @Input() className: string = 'button'
  @Input() classNameContainer: string = ''
}
