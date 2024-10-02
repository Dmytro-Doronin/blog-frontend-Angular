import { Component, OnInit } from '@angular/core'
import { CardComponent } from '../../../shared/components/card/card.component'
import { TypographyComponent } from '../../../shared/ui/typography/typography.component'
import { AuthInputComponent } from '../../auth-input/auth-input.component'
import { ButtonComponent } from '../../../shared/ui/button/button.component'
import { AsyncPipe, NgIf } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { passwordRecovery } from '../../../store/actions/auth.actions'
import { filter, Observable } from 'rxjs'
import { selectAuthAlert, selectRecoveryLoading } from '../../../store/selectors/auth.selector'
import { LoaderComponent } from '../../../shared/components/loader/loader.component'

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
    AsyncPipe,
    LoaderComponent,
  ],
  templateUrl: './recovery-form.component.html',
  styleUrl: './recovery-form.component.scss',
})
export class RecoveryFormComponent implements OnInit {
  recoveryLoading$?: Observable<boolean>
  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  recoveryForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  })

  ngOnInit(): void {
    this.loader()
    this.store
      .select(selectAuthAlert)
      .pipe(filter(authState => authState?.severity === 'success'))
      .subscribe(() => this.recoveryForm.reset())
  }

  loader() {
    this.recoveryLoading$ = this.store.select(selectRecoveryLoading)
  }

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
