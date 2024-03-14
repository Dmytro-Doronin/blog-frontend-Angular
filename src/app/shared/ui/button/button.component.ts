import { Component, Input } from '@angular/core'
import {NgClass, NgSwitch, NgSwitchCase} from '@angular/common'

@Component({
  selector: 'blog-button',
  standalone: true,
  imports: [NgClass, NgSwitch, NgSwitchCase],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant: 'Primary' | 'Secondary' | 'Tertiary' = 'Primary'
  @Input() type: 'button' | 'link' = 'button'
  @Input() content: string = ''
  @Input() link: string = '#'
  @Input() fullWidth?: boolean = false
  @Input() className: string = 'button'
}
