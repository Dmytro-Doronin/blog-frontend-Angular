import { Component, OnInit } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthInputComponent } from '../auth-input/auth-input.component'
import { ButtonComponent } from '../../shared/ui/button/button.component'
import { CardComponent } from '../card/card.component'
import { NgIf } from '@angular/common'
import { TypographyComponent } from '../../shared/ui/typography/typography.component'
import { AuthService } from '../../core/services/auth.service'
import { Store } from '@ngrx/store'
import { registerUser } from '../../store/actions/app.actions'
import { selectAlert } from '../../store/selectors/app.selector'
import { filter } from 'rxjs'

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
export class AuthSignUpFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store
  ) {}

  signUpForm = this.formBuilder.group({
    login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  })

  ngOnInit() {
    this.store
      .select(selectAlert)
      .pipe(filter(authState => authState?.severity === 'success'))
      .subscribe(() => this.signUpForm.reset())
  }

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
      const login = this.signUpForm.value.login!
      const password = this.signUpForm.value.password!
      const email = this.signUpForm.value.email!
      this.store.dispatch(registerUser({ login, password, email }))
      // this.authService
      //   .userRegistration(
      //     this.signUpForm.value.login!,
      //     this.signUpForm.value.password!,
      //     this.signUpForm.value.email!
      //   )
      //   .subscribe(res => console.log(res))
    }
  }
}
