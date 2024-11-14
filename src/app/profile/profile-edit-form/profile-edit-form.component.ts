import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { selectUserData } from '../../store/selectors/auth.selector'
import { SeverityType } from '../../types/notification.models'
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server'

@Component({
  selector: 'blog-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrl: './profile-edit-form.component.scss',
})
export class ProfileEditFormComponent implements OnInit, OnDestroy {
  @Input() userLoading?: boolean | null
  @Output() formSubmitted = new EventEmitter<{
    name: string
    file: File | null
  }>()
  @Output() closeEditSubmitted = new EventEmitter<void>()
  selectedFile: File | null = null
  userImage?: string
  temporaryUserImage?: string
  private profileSubscription: Subscription = new Subscription()
  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  editProfileUpForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
  })

  ngOnInit() {
    this.getDataFromUserState()
  }

  onFileSelect(data: { file: File; imageUrl?: string }) {
    this.selectedFile = data.file
    this.temporaryUserImage = data.imageUrl
  }

  get name() {
    return this.editProfileUpForm.get('name')
  }

  getDataFromUserState() {
    this.profileSubscription = this.store.select(selectUserData).subscribe(userData => {
      this.userImage = userData.imageUrl
      this.editProfileUpForm.patchValue({
        name: userData.login,
      })
    })
  }

  onSubmit() {
    if (this.editProfileUpForm.valid) {
      this.formSubmitted.emit({
        name: this.editProfileUpForm.value.name!,
        file: this.selectedFile,
      })
    }
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe()
  }
}
