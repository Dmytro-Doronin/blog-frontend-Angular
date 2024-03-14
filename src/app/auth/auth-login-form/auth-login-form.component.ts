import { Component } from '@angular/core';
import {CardComponent} from "../card/card.component";
import {TypographyComponent} from "../../shared/ui/typography/typography.component";
import {AuthInputComponent} from "../auth-input/auth-input.component";
import {ButtonComponent} from "../../shared/ui/button/button.component";
import {NgClass} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'blog-auth-login-form',
  standalone: true,
  imports: [
    CardComponent,
    TypographyComponent,
    AuthInputComponent,
    ButtonComponent,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './auth-login-form.component.html',
  styleUrl: './auth-login-form.component.scss'
})
export class AuthLoginFormComponent {
  loginForm = new FormGroup({
    username: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>('')
  })

  onSubmit() {
    console.warn(this.loginForm.value);
  }
}
