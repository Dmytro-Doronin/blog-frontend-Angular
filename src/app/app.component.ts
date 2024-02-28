import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BlogsModule} from "./blogs/blogs.module";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BlogsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog';
}
