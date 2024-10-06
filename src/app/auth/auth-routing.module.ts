import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthLoginComponent } from './login/auth-login/auth-login.component'
import { AuthSignUpComponent } from './sign-up/auth-sign-up/auth-sign-up.component'
import { RecoveryPageComponent } from './recovery/recovery-page/recovery-page.component'
import { NewPasswordPageComponent } from './new-password/new-password-page/new-password-page.component'
import { EmailConfirmPageComponent } from './email-confirm-page/email-confirm-page.component'
import { EmailResendingPageComponent } from './email-resending/email-resending-page/email-resending-page.component'

const authRoutes: Routes = [
  { path: 'login', component: AuthLoginComponent },
  { path: 'sign-up', component: AuthSignUpComponent },
  { path: 'email-confirmation', component: EmailConfirmPageComponent },
  { path: 'password-recovery', component: RecoveryPageComponent },
  { path: 'new-password', component: NewPasswordPageComponent },
  { path: 'registration-email-resending', component: EmailResendingPageComponent },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
