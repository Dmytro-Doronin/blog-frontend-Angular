import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get('https://blog-backend-nest.vercel.app/blogs')
  }
}
