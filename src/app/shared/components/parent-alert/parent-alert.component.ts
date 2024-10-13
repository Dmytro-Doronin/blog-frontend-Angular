import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import { Notify } from '../../../types/notification.models'
import { selectAuthAlert } from '../../../store/selectors/auth.selector'
@Component({
  selector: 'blog-parent-alert',
  templateUrl: './parent-alert.component.html',
  styleUrl: './parent-alert.component.scss',
})
export class ParentAlertComponent implements OnInit {
  showAlert$?: Observable<Notify | null>
  error?: string = ''
  constructor(private store: Store) {}

  ngOnInit() {
    this.showErrorComponent()
  }

  showErrorComponent() {
    this.showAlert$ = this.store.select(selectAuthAlert)
  }
}
