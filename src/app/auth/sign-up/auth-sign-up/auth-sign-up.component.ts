import { Component } from '@angular/core'
import { LoginImageComponent } from '../../auth-images/login-image/login-image.component'
import { AuthSignUpFormComponent } from '../auth-sign-up-form/auth-sign-up-form.component'
import { ModalComponent } from '../../../shared/components/modal/modal.component'
import { TypographyComponent } from '../../../shared/ui/typography/typography.component'
import { ButtonComponent } from '../../../shared/ui/button/button.component'
import { NgIf } from '@angular/common'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'blog-auth-sign-up',
  standalone: true,
  imports: [
    LoginImageComponent,
    AuthSignUpFormComponent,
    ModalComponent,
    TypographyComponent,
    ButtonComponent,
    NgIf,
  ],
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.scss',
})
export class AuthSignUpComponent {
  isModalOpen = true
  email: string = ''
  constructor(
    // private authService: AuthService,
    private http: HttpClient
  ) {}

  openModal(): void {
    this.isModalOpen = true
  }

  closeModal(): void {
    this.isModalOpen = false
  }

  // authRegistration(login: string, password: string, email: string) {
  //   this.authService.userRegistration(login, password, email).subscribe(res => {
  //     alert('User was added' + res)
  //   })
  // }
}
