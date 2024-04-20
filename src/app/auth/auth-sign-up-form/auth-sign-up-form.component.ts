import { Component, Input } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthInputComponent } from '../auth-input/auth-input.component'
import { ButtonComponent } from '../../shared/ui/button/button.component'
import { CardComponent } from '../card/card.component'
import { NgIf } from '@angular/common'
import { TypographyComponent } from '../../shared/ui/typography/typography.component'
import { AuthService } from '../../core/services/auth.service'
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server'

@Component({
  selector: 'blog-auth-sign-up-form',
  standalone: true,
  imports: [
    AuthInputComponent,
    ButtonComponent,
    CardComponent,
    NgIf,
    ReactiveFormsModule,
    TypographyComponent,
  ],
  templateUrl: './auth-sign-up-form.component.html',
  styleUrl: './auth-sign-up-form.component.scss',
})
export class AuthSignUpFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  signUpForm = this.formBuilder.group({
    login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  })

  get login() {
    return this.signUpForm.get('login')
  }

  get email() {
    return this.signUpForm.get('email')
  }

  get password() {
    return this.signUpForm.get('password')
  }

  onSubmit() {
    console.log(this.signUpForm.valid)
    if (this.signUpForm.valid) {
      this.authService
        .userRegistration(
          this.signUpForm.value.login!,
          this.signUpForm.value.password!,
          this.signUpForm.value.email!
        )
        .subscribe(res => console.log(res))
    }
  }
}
