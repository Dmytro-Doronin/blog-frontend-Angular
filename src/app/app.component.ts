import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { AuthModule } from './auth/auth.module'
import { BlogModule } from './blog/blog.module'
import { HeaderModule } from './shared/header/header.module'
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'blog-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    AuthModule,
    BlogModule,
    HeaderModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'blog'
}
