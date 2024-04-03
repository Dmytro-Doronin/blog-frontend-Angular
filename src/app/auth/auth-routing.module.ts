import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthLoginComponent } from './auth-login/auth-login.component'
import { AuthSignUpComponent } from './auth-sign-up/auth-sign-up.component'
import { AuthSignUpConfirmComponent } from './auth-sign-up-confirm/auth-sign-up-confirm.component'
import { AuthSignUpExpiredComponent } from './auth-sign-up-expired/auth-sign-up-expired.component'

const authRoutes: Routes = [
  { path: 'login', component: AuthLoginComponent },
  { path: 'sign-up', component: AuthSignUpComponent },
  { path: 'email-confirmed', component: AuthSignUpConfirmComponent },
  { path: 'email-link-expired', component: AuthSignUpExpiredComponent },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
