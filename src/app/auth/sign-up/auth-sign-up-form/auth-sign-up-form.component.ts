import { Component, OnInit } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthInputComponent } from '../../auth-input/auth-input.component'
import { ButtonComponent } from '../../../shared/ui/button/button.component'
import { CardComponent } from '../../card/card.component'
import { AsyncPipe, NgIf } from '@angular/common'
import { TypographyComponent } from '../../../shared/ui/typography/typography.component'
import { AuthService } from '../../../core/services/auth.service'
import { Store } from '@ngrx/store'
import { selectAlert } from '../../../store/selectors/app.selector'
import { filter, Observable } from 'rxjs'
import { registerUser, setRegistrationLoading } from '../../../store/actions/auth.actions'
import { selectAuthAlert, selectRegistrationLoading } from '../../../store/selectors/auth.selector'
import { LoaderComponent } from '../../../shared/components/loader/loader.component'
import { RouterLink } from '@angular/router'

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
    LoaderComponent,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './auth-sign-up-form.component.html',
  styleUrl: './auth-sign-up-form.component.scss',
})
export class AuthSignUpFormComponent implements OnInit {
  registrationLoader$?: Observable<boolean>
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
    this.loader()
    this.store
      .select(selectAuthAlert)
      .pipe(filter(authState => authState?.severity === 'success'))
      .subscribe(() => this.signUpForm.reset())
  }

  loader() {
    this.registrationLoader$ = this.store.select(selectRegistrationLoading)
    // this.store.dispatch(setRegistrationLoading({ registrationLoading: true }))

    this.registrationLoader$.subscribe(loader => {
      console.log(loader)
    })
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
    if (this.signUpForm.valid) {
      const login = this.signUpForm.value.login!
      const password = this.signUpForm.value.password!
      const email = this.signUpForm.value.email!
      console.log(login)
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
