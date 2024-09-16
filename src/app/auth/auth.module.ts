import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { AuthLoginComponent } from './login/auth-login/auth-login.component'
import { ButtonComponent } from '../shared/ui/button/button.component'
import { AuthInputComponent } from './auth-input/auth-input.component'
import { CardComponent } from './card/card.component'
import { AuthLoginFormComponent } from './login/auth-login-form/auth-login-form.component'
import { LoginImageComponent } from './auth-images/login-image/login-image.component'
import { AuthSignUpComponent } from './sign-up/auth-sign-up/auth-sign-up.component'
import { RecoveryPageComponent } from './recovery/recovery-page/recovery-page.component'

@NgModule({
  declarations: [AuthLoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonComponent,
    AuthInputComponent,
    CardComponent,
    AuthLoginFormComponent,
    AuthSignUpComponent,
    LoginImageComponent,
    RecoveryPageComponent,
  ],
})
export class AuthModule {}
