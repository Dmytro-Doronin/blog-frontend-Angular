import { Component } from '@angular/core'
import { ButtonComponent } from '../../../shared/ui/button/button.component'
import { EmailConfirmedComponent } from '../../auth-images/email-confirmed/email-confirmed.component'
import { TypographyComponent } from '../../../shared/ui/typography/typography.component'
import { LinkExpiredComponent } from '../../auth-images/link-expired/link-expired.component'

@Component({
  selector: 'blog-auth-sign-up-expired',
  templateUrl: './auth-sign-up-expired.component.html',
  styleUrl: './auth-sign-up-expired.component.scss',
})
export class AuthSignUpExpiredComponent {}
