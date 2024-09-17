import { Component } from '@angular/core'
import { CardComponent } from '../../card/card.component'
import { TypographyComponent } from '../../../shared/ui/typography/typography.component'
import { AuthInputComponent } from '../../auth-input/auth-input.component'
import { ButtonComponent } from '../../../shared/ui/button/button.component'
import { NgIf } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { passwordRecovery } from '../../../store/actions/auth.actions'

@Component({
  selector: 'blog-recovery-form',
  standalone: true,
  imports: [
    CardComponent,
    TypographyComponent,
    AuthInputComponent,
    ButtonComponent,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './recovery-form.component.html',
  styleUrl: './recovery-form.component.scss',
})
export class RecoveryFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  recoveryForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  })

  get email() {
    return this.recoveryForm.get('email')
  }

  onSubmit() {
    console.log(this.recoveryForm.valid)
    if (this.recoveryForm.valid) {
      const email = this.recoveryForm.value.email!
      this.store.dispatch(passwordRecovery({ email }))
    }
  }
}
