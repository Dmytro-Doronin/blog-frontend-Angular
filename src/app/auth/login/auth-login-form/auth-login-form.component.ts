import {Component, OnInit} from '@angular/core'
import { CardComponent } from '../../card/card.component'
import { TypographyComponent } from '../../../shared/ui/typography/typography.component'
import { AuthInputComponent } from '../../auth-input/auth-input.component'
import { ButtonComponent } from '../../../shared/ui/button/button.component'
import {AsyncPipe, NgClass, NgIf} from '@angular/common'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import { RouterLink } from '@angular/router'
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {Store} from "@ngrx/store";
import {loginUser} from "../../../store/actions/auth.actions";
import {Observable} from "rxjs";
import {selectAccessToken, selectLoginLoading} from "../../../store/selectors/auth.selector";
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
        RouterLink,
        AsyncPipe,
        LoaderComponent,
    ],
  templateUrl: './auth-login-form.component.html',
  styleUrl: './auth-login-form.component.scss',
})
export class AuthLoginFormComponent implements OnInit{
  loginLoading$?: Observable<boolean>
  accessToken$?: Observable<any>
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  loginForm = this.formBuilder.group({
    usernameOrEmail: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  })

  ngOnInit(): void {
    this.loader()
    this.accessToken$ = this.store.select(selectAccessToken)
    this.accessToken$.subscribe((token) => {
      console.log(token)
    })
  }
  loader() {
    this.loginLoading$ = this.store.select(selectLoginLoading)
  }

  get usernameOrEmail() {
    return this.loginForm.get('usernameOrEmail')
  }

  get password() {
    return this.loginForm.get('password')
  }

  onSubmit() {
    console.log(this.loginForm.valid)
    if (this.loginForm.valid) {
        const loginOrEmail = this.loginForm.value.usernameOrEmail!
        const password = this.loginForm.value.password!
        this.store.dispatch(loginUser({loginOrEmail, password}))
    }

    this.accessToken$ = this.store.select(selectAccessToken)
    this.accessToken$.subscribe((token) => {
      console.log(token)
    })
  }


}
