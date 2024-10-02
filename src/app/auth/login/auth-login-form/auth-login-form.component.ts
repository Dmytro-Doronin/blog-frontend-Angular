import { Component, EventEmitter, Input, Output } from '@angular/core'

import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'blog-auth-login-form',
  templateUrl: './auth-login-form.component.html',
  styleUrl: './auth-login-form.component.scss',
})
export class AuthLoginFormComponent {
  @Input() loginLoading: boolean | null = false
  @Output() formSubmitted = new EventEmitter<{ usernameOrEmail: string; password: string }>()
  constructor(private formBuilder: FormBuilder) {}

  loginForm = this.formBuilder.group({
    usernameOrEmail: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  })

  get usernameOrEmail() {
    return this.loginForm.get('usernameOrEmail')
  }

  get password() {
    return this.loginForm.get('password')
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.formSubmitted.emit({
        usernameOrEmail: this.loginForm.value.usernameOrEmail!,
        password: this.loginForm.value.password!,
      })
    }
  }
}
