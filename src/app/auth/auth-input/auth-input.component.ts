import { Component, forwardRef, Input } from '@angular/core'
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'
import { EyeCloseComponent } from '../eye-close/eye-close.component'
import { NgClass, NgIf } from '@angular/common'
import { EyeOpenComponent } from '../eye-open/eye-open.component'

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
