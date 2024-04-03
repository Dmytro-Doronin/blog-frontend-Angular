import { Component } from '@angular/core'
import { LoginImageComponent } from '../auth-images/login-image/login-image.component'
import { AuthSignUpFormComponent } from '../auth-sign-up-form/auth-sign-up-form.component'
import { ModalComponent } from '../../shared/components/modal/modal.component'
import { TypographyComponent } from '../../shared/ui/typography/typography.component'
import { ButtonComponent } from '../../shared/ui/button/button.component'
import { NgIf } from '@angular/common'

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
  isModalOpen = false

  openModal(): void {
    this.isModalOpen = true
  }

  closeModal(): void {
    this.isModalOpen = false
  }
}
