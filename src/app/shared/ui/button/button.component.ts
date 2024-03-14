import { Component, Input } from '@angular/core'
import { NgClass, NgSwitch } from '@angular/common'

@Component({
  selector: 'blog-button',
  standalone: true,
  imports: [NgClass, NgSwitch],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() buttonType: 'Primary' | 'Secondary' = 'Primary'
  @Input() fullWidth?: boolean = false
  @Input() className: string = 'button'
}
