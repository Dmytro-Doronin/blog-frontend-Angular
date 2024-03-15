import { Component } from '@angular/core'
import { CardComponent } from '../card/card.component'
import { TypographyComponent } from '../../shared/ui/typography/typography.component'
import { AuthInputComponent } from '../auth-input/auth-input.component'
import { ButtonComponent } from '../../shared/ui/button/button.component'
import { NgClass, NgIf } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
@Component({
  selector: 'blog-auth-login-form',
  standalone: true,
  imports: [
    CardComponent,
    TypographyComponent,
    AuthInputComponent,
    ButtonComponent,
    NgClass,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './auth-login-form.component.html',
  styleUrl: './auth-login-form.component.scss',
})
export class AuthLoginFormComponent {
  constructor(private formBuilder: FormBuilder) {}

  loginForm = this.formBuilder.group({
    usernameOrEmail: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  })

  // loginForm = new FormGroup({
  //   usernameOrEmail: new FormControl<string>('', []),
  //   password: new FormControl<string>(''),
  // })

  get usernameOrEmail() {
    return this.loginForm.get('usernameOrEmail')
  }

  get password() {
    return this.loginForm.get('password')
  }

  onSubmit() {
    console.log(this.loginForm.valid)
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
    }
  }
}
