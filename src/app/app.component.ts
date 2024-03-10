import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { BlogsModule } from './blogs/blogs.module'
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, BlogsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'blog'
}
