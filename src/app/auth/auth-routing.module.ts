import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthLoginComponent } from './login/auth-login/auth-login.component'
import { AuthSignUpComponent } from './sign-up/auth-sign-up/auth-sign-up.component'
import { AuthSignUpConfirmComponent } from './sign-up/auth-sign-up-confirm/auth-sign-up-confirm.component'
import { AuthSignUpExpiredComponent } from './sign-up/auth-sign-up-expired/auth-sign-up-expired.component'
import { RecoveryPageComponent } from './recovery/recovery-page/recovery-page.component'

const authRoutes: Routes = [
  { path: 'login', component: AuthLoginComponent },
  { path: 'sign-up', component: AuthSignUpComponent },
  { path: 'email-confirmed', component: AuthSignUpConfirmComponent },
  { path: 'email-link-expired', component: AuthSignUpExpiredComponent },
  { path: 'password-recovery', component: RecoveryPageComponent },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
