import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core'
import { SeverityType } from '../../../../types/notification.models'
import { FormBuilder, Validators } from '@angular/forms'
import { selectPostById } from '../../../../store/selectors/posts.selector'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectCommentById } from '../../../../store/selectors/comments.selectoe'

@Component({
  selector: 'blog-edit-comment-form',
  templateUrl: './edit-comment-form.component.html',
  styleUrl: './edit-comment-form.component.scss',
})
export class EditCommentFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() loading?: boolean | null = false
  @Input() currentCommentId: string | undefined | null = ''
  @Input() isAuthenticated: boolean | null = false
  @Input() authSeverity?: SeverityType | undefined | null
  @Output() formSubmitted = new EventEmitter<{
    content: string
  }>()
  @Output() closeFormSubmitted = new EventEmitter<void>()
  private formDataSubscribe: Subscription = new Subscription()
  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  editCommentForPostForm = this.formBuilder.group({
    content: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
  })

  closeForm() {
    this.closeFormSubmitted.emit()
  }

  ngOnInit() {
    this.getDataFromComment()
  }

  get content() {
    return this.editCommentForPostForm.get('content')
  }

  getDataFromComment() {
    this.formDataSubscribe = this.store
      .select(selectCommentById(this.currentCommentId!))
      .subscribe(comment => {
        console.log(comment)
        if (comment) {
          this.editCommentForPostForm.patchValue({
            content: comment.content,
          })
        }
      })
  }

  onSubmit() {
    if (this.editCommentForPostForm.valid) {
      console.log('form valid')

      this.formSubmitted.emit({
        content: this.editCommentForPostForm.value.content!,
      })
    }
  }

  ngOnChanges() {
    if (this.authSeverity === 'success') {
      this.editCommentForPostForm.reset()
    }
  }

  ngOnDestroy() {
    this.formDataSubscribe.unsubscribe()
  }
}
