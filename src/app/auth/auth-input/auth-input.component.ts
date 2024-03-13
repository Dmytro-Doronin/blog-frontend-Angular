import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'blog-auth-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './auth-input.component.html',
  styleUrl: './auth-input.component.scss'
})
export class AuthInputComponent {
  @Input() title: string = ''
  inputValue: string = ''


}
