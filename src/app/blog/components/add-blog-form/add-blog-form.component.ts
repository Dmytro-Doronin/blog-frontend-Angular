import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { SeverityType } from '../../../types/notification.models'

@Component({
  selector: 'blog-add-blog-form',
  templateUrl: './add-blog-form.component.html',
  styleUrl: './add-blog-form.component.scss',
})
export class AddBlogFormComponent implements OnChanges {
  @Input() loading?: boolean | null = false
  @Input() authSeverity?: SeverityType | undefined | null
  @Output() formSubmitted = new EventEmitter<{
    name: string
    description: string
    websiteUrl: string
    file: File
  }>()
  selectedFile: File | null = null
  constructor(private formBuilder: FormBuilder) {}

  addBlogUpForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(15)]],
    description: ['', [Validators.required, Validators.maxLength(500)]], // Validators.minLength(3)
    websiteUrl: [
      '',
      [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/),
      ],
    ],
  })

  get name() {
    return this.addBlogUpForm.get('name')
  }

  get description() {
    return this.addBlogUpForm.get('description')
  }

  get websiteUrl() {
    return this.addBlogUpForm.get('websiteUrl')
  }

  onFileSelect(data: { file: File }) {
    this.selectedFile = data.file
  }
  // onFileSelect(event: Event) {
  //   const input = event.target as HTMLInputElement
  //   if (input.files?.length) {
  //     this.selectedFile = input.files[0]
  //   }
  // }

  onSubmit() {
    if (this.addBlogUpForm.valid) {
      console.log('form valid')
      this.formSubmitted.emit({
        name: this.addBlogUpForm.value.name!,
        description: this.addBlogUpForm.value.description!,
        websiteUrl: this.addBlogUpForm.value.websiteUrl!,
        file: this.selectedFile!,
      })
    }
  }

  ngOnChanges() {
    if (this.authSeverity === 'success') {
      this.addBlogUpForm.reset()
    }
  }
}
