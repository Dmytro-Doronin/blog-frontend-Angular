import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core'
import { SeverityType } from '../../../types/notification.models'
import { IOptions } from '../../../types/options.models'
import { FormBuilder, Validators } from '@angular/forms'
import { selectBlogById } from '../../../store/selectors/blogs.selector'
import { Store } from '@ngrx/store'
import { selectPostById } from '../../../store/selectors/posts.selector'
import { Subscription } from 'rxjs'

@Component({
  selector: 'blog-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrl: './edit-post-form.component.scss',
})
export class EditPostFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() loading?: boolean | null = false
  @Input() authSeverity?: SeverityType | undefined | null
  @Input() currentPostId: string | null = ''
  @Input() options?: IOptions[]
  @Output() formSubmitted = new EventEmitter<{
    title: string
    shortDescription: string
    content: string
  }>()
  private formDataSubscribe: Subscription = new Subscription()
  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  editPostForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(30)]],
    shortDescription: ['', [Validators.required, Validators.maxLength(100)]],
    content: ['', [Validators.required, Validators.maxLength(1000)]],
  })

  ngOnInit() {
    this.getDataFromBlog()
  }

  get title() {
    return this.editPostForm.get('title')
  }

  get shortDescription() {
    return this.editPostForm.get('shortDescription')
  }

  get content() {
    return this.editPostForm.get('content')
  }

  getDataFromBlog() {
    this.formDataSubscribe = this.store
      .select(selectPostById(this.currentPostId))
      .subscribe(post => {
        console.log(post)
        if (post) {
          this.editPostForm.patchValue({
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
          })
        }
      })
  }

  onSubmit() {
    if (this.editPostForm.valid) {
      console.log('form valid')

      this.formSubmitted.emit({
        title: this.editPostForm.value.title!,
        shortDescription: this.editPostForm.value.shortDescription!,
        content: this.editPostForm.value.content!,
      })
    }
  }
  ngOnChanges() {
    if (this.authSeverity === 'success') {
      this.editPostForm.reset()
    }
  }

  ngOnDestroy() {
    this.formDataSubscribe.unsubscribe()
  }
}
