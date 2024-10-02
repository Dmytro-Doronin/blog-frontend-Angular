import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core'

import { FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import { SeverityType } from '../../../types/notification.models'

@Component({
  selector: 'blog-recovery-form',
  templateUrl: './recovery-form.component.html',
  styleUrl: './recovery-form.component.scss',
})
export class RecoveryFormComponent implements OnChanges {
  @Output() formSubmitted = new EventEmitter<{ email: string }>()
  @Input() authSeverity?: SeverityType | undefined | null
  @Input() loading?: boolean | null
  constructor(private formBuilder: FormBuilder) {}

  recoveryForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  })

  get email() {
    return this.recoveryForm.get('email')
  }

  onSubmit() {
    if (this.recoveryForm.valid) {
      this.formSubmitted.emit({ email: this.recoveryForm.value.email! })
    }
  }

  ngOnChanges() {
    if (this.authSeverity === 'success') {
      this.recoveryForm.reset()
    }
  }
}
