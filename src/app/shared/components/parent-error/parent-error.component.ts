import { Component, OnInit } from '@angular/core'
import { ErrorComponent } from '../error/error.component'
import { AsyncPipe, NgIf } from '@angular/common'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectError } from '../../../store/selectors/app.selector'
import { Notify } from '../../../types/notification.models'
import { addError } from '../../../store/actions/app.actions'
@Component({
  selector: 'blog-parent-error',
  standalone: true,
  imports: [ErrorComponent, NgIf, AsyncPipe],
  templateUrl: './parent-error.component.html',
  styleUrl: './parent-error.component.scss',
})
export class ParentErrorComponent implements OnInit {
  showError$: Observable<Notify | null> = this.store.select(selectError)
  error?: string = ''
  constructor(private store: Store) {}

  ngOnInit() {
    this.showErrorComponent()
  }

  showErrorComponent() {
    // this.showError$ = this.store.select(selectError)
    console.log()
    this.store.dispatch(addError({ severity: 'error', message: 'gavno' }))
    this.showError$.subscribe(error => {
      this.error = error?.message
      console.log(error?.message)
    })
    setTimeout(() => {}, 5000)
  }
}
