import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

import { SeverityType } from '../../../types/notification.models'

@Component({
  selector: 'blog-auth-sign-up-form',
  templateUrl: './auth-sign-up-form.component.html',
  styleUrl: './auth-sign-up-form.component.scss',
})
export class AuthSignUpFormComponent implements OnChanges {
  @Input() loading: boolean | null = false
  @Input() authSeverity?: SeverityType | undefined | null
  @Output() formSubmitted = new EventEmitter<{ login: string; password: string; email: string }>()
  constructor(private formBuilder: FormBuilder) {}

  signUpForm = this.formBuilder.group({
    login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
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
    if (this.signUpForm.valid) {
      this.formSubmitted.emit({
        login: this.signUpForm.value.login!,
        password: this.signUpForm.value.password!,
        email: this.signUpForm.value.email!,
      })
    }
  }

  ngOnChanges() {
    if (this.authSeverity === 'success') {
      this.signUpForm.reset()
    }
  }
}
