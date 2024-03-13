import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthLoginComponent } from './auth-login/auth-login.component'

const authRoutes: Routes = [
  { path: 'login', component: AuthLoginComponent },
  // { path: 'sign-up', component: SignUpComponent },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
