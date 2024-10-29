import { Component, EventEmitter, Input, Output } from '@angular/core'
import { SeverityType } from '../../../types/notification.models'
import { FormBuilder, Validators } from '@angular/forms'
import { IOptions } from '../../../types/options.models'

@Component({
  selector: 'blog-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrl: './add-post-form.component.scss',
})
export class AddPostFormComponent {
  @Input() loading?: boolean | null = false
  @Input() authSeverity?: SeverityType | undefined | null
  @Input() options?: IOptions[]
  @Output() formSubmitted = new EventEmitter<{
    title: string
    shortDescription: string
    content: string
    blogId: string
  }>()
  constructor(private formBuilder: FormBuilder) {}

  addPostForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(30)]],
    shortDescription: ['', [Validators.required, Validators.maxLength(100)]],
    content: ['', [Validators.required, Validators.maxLength(1000)]],
    blogId: ['', [Validators.required]],
  })

  get title() {
    return this.addPostForm.get('title')
  }

  get shortDescription() {
    return this.addPostForm.get('shortDescription')
  }

  get content() {
    return this.addPostForm.get('content')
  }

  onSubmit() {
    console.log('ne valid')
    console.log(this.addPostForm.value.blogId!)
    if (this.addPostForm.valid) {
      console.log('form valid')

      this.formSubmitted.emit({
        title: this.addPostForm.value.title!,
        shortDescription: this.addPostForm.value.shortDescription!,
        content: this.addPostForm.value.content!,
        blogId: this.addPostForm.value.blogId!,
      })
    }
  }
  onSortChge(item: { itemId: string }) {
    this.addPostForm.patchValue({
      blogId: item.itemId,
    })
  }
  ngOnChanges() {
    if (this.authSeverity === 'success') {
      this.addPostForm.reset()
    }
  }
}
