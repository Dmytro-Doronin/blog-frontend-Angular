import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core'
import { SeverityType } from '../../../types/notification.models'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'blog-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrl: './add-comment-form.component.scss',
})
export class AddCommentFormComponent implements OnChanges {
  @Input() loading?: boolean | null = false
  @Input() isAuthenticated: boolean | null = false
  @Input() authSeverity?: SeverityType | undefined | null
  @Output() formSubmitted = new EventEmitter<{
    content: string
  }>()
  isOpenForm: boolean = false

  constructor(private formBuilder: FormBuilder) {}

  addCommentForPostForm = this.formBuilder.group({
    content: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
  })

  get content() {
    return this.addCommentForPostForm.get('content')
  }

  onOpen() {
    this.isOpenForm = true
  }

  onClose() {
    this.isOpenForm = false
  }

  onSubmit() {
    if (this.addCommentForPostForm.valid) {
      console.log('form valid')

      this.formSubmitted.emit({
        content: this.addCommentForPostForm.value.content!,
      })
    }
  }

  ngOnChanges() {
    if (this.authSeverity === 'success') {
      this.addCommentForPostForm.reset()
    }
  }
}
