import { Component, Input, input, OnInit } from '@angular/core'
import { AuthInputComponent } from '../../auth-input/auth-input.component'
import { ButtonComponent } from '../../../shared/ui/button/button.component'
import { CardComponent } from '../../../shared/components/card/card.component'
import { AsyncPipe, NgIf } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { TypographyComponent } from '../../../shared/ui/typography/typography.component'
import { Store } from '@ngrx/store'
import { newPasswordAction } from '../../../store/actions/auth.actions'
import { LoaderComponent } from '../../../shared/components/loader/loader.component'
import { filter, Observable } from 'rxjs'
import { selectAuthAlert, selectNewPasswordLoading } from '../../../store/selectors/auth.selector'

@Component({
  selector: 'blog-new-password-form',
  standalone: true,
  imports: [
    AuthInputComponent,
    ButtonComponent,
    CardComponent,
    NgIf,
    ReactiveFormsModule,
    TypographyComponent,
    AsyncPipe,
    LoaderComponent,
  ],
  templateUrl: './new-password-form.component.html',
  styleUrl: './new-password-form.component.scss',
})
export class NewPasswordFormComponent implements OnInit {
  @Input() code: string | null = ''
  newPasswordLoading$?: Observable<boolean>
  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  newPasswordForm = this.formBuilder.group({
    newPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  })

  ngOnInit(): void {
    this.loader()
  }

  loader() {
    this.newPasswordLoading$ = this.store.select(selectNewPasswordLoading)
    this.store
      .select(selectAuthAlert)
      .pipe(filter(authState => authState?.severity === 'success'))
      .subscribe(() => this.newPasswordForm.reset())
  }

  onSubmit() {
    console.log(this.newPasswordForm.valid)
    console.log(
      this.newPasswordForm.value.newPassword!,
      this.newPasswordForm.value.confirmPassword!
    )
    if (
      this.newPasswordForm.valid &&
      this.newPasswordForm.value.newPassword! === this.newPasswordForm.value.confirmPassword!
    ) {
      const newPassword = this.newPasswordForm.value.newPassword!
      let uriCode = this.code
      if (uriCode === null) {
        uriCode = ''
      }
      this.store.dispatch(newPasswordAction({ newPassword, recoveryCode: uriCode }))
      // this.store.dispatch(passwordRecovery({ password }))
    }
  }
}
