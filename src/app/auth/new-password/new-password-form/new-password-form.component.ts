import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core'

import { FormBuilder, Validators } from '@angular/forms'

import { Store } from '@ngrx/store'

import { SeverityType } from '../../../types/notification.models'

@Component({
  selector: 'blog-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrl: './new-password-form.component.scss',
})
export class NewPasswordFormComponent implements OnChanges {
  @Input() authSeverity?: SeverityType | undefined | null
  @Input() loading?: boolean | null
  @Output() formSubmitted = new EventEmitter<{ newPassword: string }>()

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  newPasswordForm = this.formBuilder.group({
    newPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  })

  onSubmit() {
    if (
      this.newPasswordForm.valid &&
      this.newPasswordForm.value.newPassword! === this.newPasswordForm.value.confirmPassword!
    ) {
      this.formSubmitted.emit({
        newPassword: this.newPasswordForm.value.newPassword!,
      })
    }
  }
  ngOnChanges() {
    if (this.authSeverity === 'success') {
      this.newPasswordForm.reset()
    }
  }
}
