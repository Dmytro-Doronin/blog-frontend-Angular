import { Component } from '@angular/core'
import { LoginImageComponent } from '../auth-images/login-image/login-image.component'
import { AuthSignUpFormComponent } from '../auth-sign-up-form/auth-sign-up-form.component'

@Component({
  selector: 'blog-auth-sign-up',
  standalone: true,
  imports: [LoginImageComponent, AuthSignUpFormComponent],
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.scss',
})
export class AuthSignUpComponent {}
