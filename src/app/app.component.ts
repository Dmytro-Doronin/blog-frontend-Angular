import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { AuthModule } from './auth/auth.module'
import { BlogModule } from './blog/blog.module'
import { HeaderModule } from './shared/header/header.module'
import { ReactiveFormsModule } from '@angular/forms'
import { ParentAlertComponent } from './shared/components/parent-alert/parent-alert.component'
import { Store } from '@ngrx/store'
import { authMe } from './store/actions/auth.actions'

@Component({
  selector: 'blog-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    BlogModule,
    AuthModule,
    HeaderModule,
    ReactiveFormsModule,
    ParentAlertComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'blog'

  constructor(private store: Store) {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken')
    console.log('token in app', accessToken)
    if (accessToken) {
      this.store.dispatch(authMe())
    }
  }
}
