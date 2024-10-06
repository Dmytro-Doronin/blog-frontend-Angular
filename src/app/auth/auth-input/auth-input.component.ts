import { Component, forwardRef, Input } from '@angular/core'
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'blog-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrl: './auth-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthInputComponent),
      multi: true,
    },
  ],
})
export class AuthInputComponent {
  @Input() id: string = 'text'
  @Input() title: string = ''
  @Input() type: string = 'text'
  @Input() showIcon: boolean = false
  @Input() control: FormControl = new FormControl('')

  changeInputType(type: string) {
    this.type = type === 'text' ? 'password' : 'text'
  }
}
