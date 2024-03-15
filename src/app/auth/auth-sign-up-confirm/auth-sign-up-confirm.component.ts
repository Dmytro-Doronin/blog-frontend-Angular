import { Component } from '@angular/core';
import {TypographyComponent} from "../../shared/ui/typography/typography.component";
import {ButtonComponent} from "../../shared/ui/button/button.component";
import {EmailConfirmedComponent} from "../auth-images/email-confirmed/email-confirmed.component";

@Component({
  selector: 'blog-auth-sign-up-confirm',
  standalone: true,
  imports: [
    TypographyComponent,
    ButtonComponent,
    EmailConfirmedComponent
  ],
  templateUrl: './auth-sign-up-confirm.component.html',
  styleUrl: './auth-sign-up-confirm.component.scss'
})
export class AuthSignUpConfirmComponent {

}
