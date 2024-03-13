import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { EyeComponent } from '../eye/eye.component'
import { NgClass, NgIf } from '@angular/common'

@Component({
  selector: 'blog-auth-input',
  standalone: true,
  imports: [FormsModule, EyeComponent, NgClass, NgIf],
  templateUrl: './auth-input.component.html',
  styleUrl: './auth-input.component.scss',
})
export class AuthInputComponent {
  @Input() title: string = ''
  @Input() type: string = 'text'
  @Input() showIcon: boolean = false
  inputValue: string = ''
}
