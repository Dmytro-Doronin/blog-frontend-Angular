import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'blog-add-blog-form',
  standalone: true,
  imports: [],
  templateUrl: './add-blog-form.component.html',
  styleUrl: './add-blog-form.component.scss'
})
export class AddBlogFormComponent {
  @Output() formSubmitted = new EventEmitter<{ login: string; password: string; email: string }>()
  constructor(private formBuilder: FormBuilder) {}

  addBlogUpForm = this.formBuilder.group({
    login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  })
}
