import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { AuthLoginComponent } from './auth-login/auth-login.component'
import {ButtonComponent} from "../shared/ui/button/button.component";
import {AuthInputComponent} from "./auth-input/auth-input.component";

@NgModule({
  declarations: [AuthLoginComponent],
  imports: [CommonModule, AuthRoutingModule, ButtonComponent, AuthInputComponent],
})
export class AuthModule {}
