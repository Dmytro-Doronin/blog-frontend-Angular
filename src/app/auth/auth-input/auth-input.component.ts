import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { EyeCloseComponent } from '../eye-close/eye-close.component'
import { NgClass, NgIf } from '@angular/common'
import {EyeOpenComponent} from "../eye-open/eye-open.component";

@Component({
  selector: 'blog-auth-input',
  standalone: true,
  imports: [FormsModule, EyeCloseComponent, EyeOpenComponent, NgClass, NgIf],
  templateUrl: './auth-input.component.html',
  styleUrl: './auth-input.component.scss',
})
export class AuthInputComponent {
  @Input() id: string = 'text'
  @Input() title: string = ''
  @Input() type: string = 'text'
  @Input() showIcon: boolean = false
  inputValue: string = ''


  changeInputType (type: string) {
    if (type === 'text') {
      this.type = 'password'
    } else {
      this.type = 'text'
    }
  }

}
