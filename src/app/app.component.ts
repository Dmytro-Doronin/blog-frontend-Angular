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
import {AppLoaderComponent} from "./shared/components/app-loader/app-loader.component";
import {Observable} from "rxjs";
import {selectAppLoading} from "./store/selectors/app.selector";
import {AsyncPipe, NgIf} from "@angular/common";

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
    AppLoaderComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'blog'
  appLoading$?: Observable<boolean>
  constructor(private store: Store) {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      this.store.dispatch(authMe())
    }

    this.appLoading$ = this.store.select(selectAppLoading)
  }
}
