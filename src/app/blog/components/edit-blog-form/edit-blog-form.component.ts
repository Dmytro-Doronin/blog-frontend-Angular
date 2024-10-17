import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core'
import { SeverityType } from '../../../types/notification.models'
import { FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { selectBlogById } from '../../../store/selectors/blogs.selector'
import { Observable, Subscription } from 'rxjs'
import { selectItemId } from '../../../store/selectors/app.selector'

@Component({
  selector: 'blog-edit-blog-form',
  templateUrl: './edit-blog-form.component.html',
  styleUrl: './edit-blog-form.component.scss',
})
export class EditBlogFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() loading?: boolean | null = false
  @Input() authSeverity?: SeverityType | undefined | null
  currentBlogId: string | null = ''
  private blogIdSubscription: Subscription = new Subscription()

  @Output() formSubmitted = new EventEmitter<{
    name: string
    description: string
    websiteUrl: string
  }>()
  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  editBlogUpForm = this.formBuilder.group({
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

  ngOnInit() {
    this.getBlogId()
    this.getDataFromBlog()
  }

  get name() {
    return this.editBlogUpForm.get('name')
  }

  get description() {
    return this.editBlogUpForm.get('description')
  }

  get websiteUrl() {
    return this.editBlogUpForm.get('websiteUrl')
  }

  getBlogId() {
    this.blogIdSubscription = this.store.select(selectItemId).subscribe(blogId => {
      this.currentBlogId = blogId
    })
  }

  getDataFromBlog() {
    this.store.select(selectBlogById(this.currentBlogId)).subscribe(blog => {
      if (blog) {
        this.editBlogUpForm.patchValue({
          name: blog.name,
          description: blog.description,
          websiteUrl: blog.websiteUrl,
        })
      }
    })
  }

  onSubmit() {
    if (this.editBlogUpForm.valid) {
      this.formSubmitted.emit({
        name: this.editBlogUpForm.value.name!,
        description: this.editBlogUpForm.value.description!,
        websiteUrl: this.editBlogUpForm.value.websiteUrl!,
      })
    }
  }

  ngOnChanges() {
    if (this.authSeverity === 'success') {
      this.editBlogUpForm.reset()
    }
  }

  ngOnDestroy(): void {
    this.blogIdSubscription.unsubscribe()
  }
}
