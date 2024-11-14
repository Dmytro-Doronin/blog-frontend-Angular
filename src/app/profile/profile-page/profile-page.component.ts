import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import {
  selectAuthAlertSeverity,
  selectUserImage,
  selectUserLoading,
  selectUserLogin,
} from '../../store/selectors/auth.selector'
import { changeUserData } from '../../store/actions/auth.actions'
import { SeverityType } from '../../types/notification.models'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'blog-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  isEdit: boolean = false
  profileName$?: Observable<string>
  profileImage$?: Observable<string>
  userLoading$?: Observable<boolean>
  authSeverity$?: Observable<SeverityType | undefined>
  private severitySubscription: Subscription = new Subscription()
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getUserName()
    this.getUserLoading()
    this.getAuthSeverity()
  }

  getUserLoading() {
    this.userLoading$ = this.store.select(selectUserLoading)
  }

  closeEdit() {
    this.isEdit = false
  }

  getAuthSeverity() {
    this.authSeverity$ = this.store.select(selectAuthAlertSeverity)
    this.severitySubscription = this.authSeverity$
      .pipe(filter(severity => severity === 'success'))
      .subscribe(() => {
        this.closeEdit()
      })
  }

  getUserName() {
    this.profileName$ = this.store.select(selectUserLogin)
    this.profileImage$ = this.store.select(selectUserImage)
  }

  toggleIsEdit() {
    this.isEdit = !this.isEdit
  }

  onFormSubmit(data: { name: string; file: File | null }) {
    this.store.dispatch(changeUserData({ login: data.name, file: data.file }))
  }

  ngOnDestroy() {
    this.severitySubscription.unsubscribe()
  }
}
