import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthLoginComponent } from './auth-login/auth-login.component'
import { AuthSignUpComponent } from './auth-sign-up/auth-sign-up.component'

const authRoutes: Routes = [
  { path: 'login', component: AuthLoginComponent },
  { path: 'sign-up', component: AuthSignUpComponent },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
