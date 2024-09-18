import { Component, Input, input, OnInit } from '@angular/core'
import { AuthInputComponent } from '../../auth-input/auth-input.component'
import { ButtonComponent } from '../../../shared/ui/button/button.component'
import { CardComponent } from '../../card/card.component'
import { NgIf } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { TypographyComponent } from '../../../shared/ui/typography/typography.component'
import { Store } from '@ngrx/store'
import { newPasswordAction } from '../../../store/actions/auth.actions'

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
  ],
  templateUrl: './new-password-form.component.html',
  styleUrl: './new-password-form.component.scss',
})
export class NewPasswordFormComponent {
  @Input() code: string | null = ''

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  newPasswordForm = this.formBuilder.group({
    newPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  })

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
