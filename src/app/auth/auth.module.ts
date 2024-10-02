import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { AuthLoginComponent } from './login/auth-login/auth-login.component'
import { AuthInputComponent } from './auth-input/auth-input.component'
import { AuthLoginFormComponent } from './login/auth-login-form/auth-login-form.component'
import { LoginImageComponent } from './auth-images/login-image/login-image.component'
import { AuthSignUpComponent } from './sign-up/auth-sign-up/auth-sign-up.component'
import { RecoveryPageComponent } from './recovery/recovery-page/recovery-page.component'
import { SharedModule } from '../shared/shared.module'
import { EmailConfirmedComponent } from './auth-images/email-confirmed/email-confirmed.component'
import { LinkExpiredComponent } from './auth-images/link-expired/link-expired.component'
import { AuthPageComponent } from './auth-page/auth-page.component'
import { EyeCloseComponent } from './eye-close/eye-close.component'
import { EyeOpenComponent } from './eye-open/eye-open.component'
import { NewPasswordFormComponent } from './new-password/new-password-form/new-password-form.component'
import { NewPasswordPageComponent } from './new-password/new-password-page/new-password-page.component'
import { RecoveryFormComponent } from './recovery/recovery-form/recovery-form.component'
import { AuthSignUpConfirmComponent } from './sign-up/auth-sign-up-confirm/auth-sign-up-confirm.component'
import { AuthSignUpExpiredComponent } from './sign-up/auth-sign-up-expired/auth-sign-up-expired.component'
import { AuthSignUpFormComponent } from './sign-up/auth-sign-up-form/auth-sign-up-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { EmailConfirmPageComponent } from './email-confirm-page/email-confirm-page.component'

@NgModule({
  declarations: [
    AuthLoginComponent,
    EmailConfirmedComponent,
    LinkExpiredComponent,
    LoginImageComponent,
    AuthInputComponent,
    AuthPageComponent,
    EyeCloseComponent,
    EyeOpenComponent,
    AuthLoginComponent,
    AuthLoginFormComponent,
    NewPasswordFormComponent,
    NewPasswordPageComponent,
    RecoveryFormComponent,
    RecoveryPageComponent,
    AuthSignUpComponent,
    AuthSignUpConfirmComponent,
    AuthSignUpExpiredComponent,
    AuthSignUpFormComponent,
    EmailConfirmPageComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule],
})
export class AuthModule {}
