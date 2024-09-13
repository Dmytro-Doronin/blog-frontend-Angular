import { Component, OnInit } from '@angular/core'
import { AlertComponent } from '../alert/alert.component'
import { AsyncPipe, NgIf } from '@angular/common'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectError } from '../../../store/selectors/app.selector'
import { Notify } from '../../../types/notification.models'
import { addError } from '../../../store/actions/app.actions'
@Component({
  selector: 'blog-parent-alert',
  standalone: true,
  imports: [AlertComponent, NgIf, AsyncPipe],
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
    this.showAlert$ = this.store.select(selectError)
    // this.showError$.subscribe(alert => {
    //   this.alert = alert?.message
    //   console.log(alert?.message)
    // })
    setTimeout(() => {}, 5000)
  }
}
