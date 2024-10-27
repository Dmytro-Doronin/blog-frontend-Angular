import { Component, EventEmitter, Input, Output } from '@angular/core'
import { SeverityType } from '../../../types/notification.models'
import { FormBuilder, Validators } from '@angular/forms'
import { postsOptions } from '../../../data/options'
import { IOptions } from '../../../types/options.models'

@Component({
  selector: 'blog-add-post-for-blog-form',
  templateUrl: './add-post-for-blog-form.component.html',
  styleUrl: './add-post-for-blog-form.component.scss',
})
export class AddPostForBlogFormComponent {
  @Input() loading?: boolean | null = false
  @Input() options?: IOptions[]

  @Input() authSeverity?: SeverityType | undefined | null
  @Output() formSubmitted = new EventEmitter<{
    title: string
    shortDescription: string
    content: string
  }>()
  constructor(private formBuilder: FormBuilder) {}

  addPostForBlogUpForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(30)]],
    shortDescription: ['', [Validators.required, Validators.maxLength(100)]], // Validators.minLength(3)
    content: ['', [Validators.required, Validators.maxLength(1000)]],
  })

  get title() {
    return this.addPostForBlogUpForm.get('title')
  }

  get shortDescription() {
    return this.addPostForBlogUpForm.get('shortDescription')
  }

  get content() {
    return this.addPostForBlogUpForm.get('content')
  }

  onSubmit() {
    if (this.addPostForBlogUpForm.valid) {
      console.log('form valid')

      this.formSubmitted.emit({
        title: this.addPostForBlogUpForm.value.title!,
        shortDescription: this.addPostForBlogUpForm.value.shortDescription!,
        content: this.addPostForBlogUpForm.value.content!,
      })
    }
  }

  ngOnChanges() {
    if (this.authSeverity === 'success') {
      this.addPostForBlogUpForm.reset()
    }
  }

  protected readonly postsOptions = postsOptions
}
