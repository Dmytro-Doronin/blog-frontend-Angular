import { Component, OnInit } from '@angular/core'
import { ErrorComponent } from '../error/error.component'
import { NgIf } from '@angular/common'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectError } from '../../../store/selectors/app.selector'
@Component({
  selector: 'blog-parent-error',
  standalone: true,
  imports: [ErrorComponent, NgIf],
  templateUrl: './parent-error.component.html',
  styleUrl: './parent-error.component.scss',
})
export class ParentErrorComponent implements OnInit {
  showError$?: Observable<string | null>

  constructor(private store: Store) {}

  ngOnInit() {
    this.showErrorComponent()
  }

  showErrorComponent() {
    this.showError$ = this.store.select(selectError)
    console.log(this.showError$)
    setTimeout(() => {}, 5000)
  }
}
