import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core'
import { NgIf } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { SharedModule } from '../../../shared/shared.module'
import { Store } from '@ngrx/store'
import { SeverityType } from '../../../types/notification.models'

@Component({
  selector: 'blog-email-resending-form',
  templateUrl: './email-resending-form.component.html',
  styleUrl: './email-resending-form.component.scss',
})
export class EmailResendingFormComponent implements OnChanges {
  @Input() authSeverity?: SeverityType | undefined | null
  @Input() loading?: boolean | null
  @Output() formSubmitted = new EventEmitter<{ email: string }>()
  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  emailResendingForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  })

  onSubmit() {
    if (
      this.emailResendingForm.valid &&
      this.emailResendingForm.value.email! === this.emailResendingForm.value.email!
    ) {
      this.formSubmitted.emit({
        email: this.emailResendingForm.value.email!,
      })
    }
  }

  ngOnChanges() {
    if (this.authSeverity === 'success') {
      this.emailResendingForm.reset()
    }
  }
}
