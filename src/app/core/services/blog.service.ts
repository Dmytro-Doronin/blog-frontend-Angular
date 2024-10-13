import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BlogResponse, IBlog, PostBlogModel } from '../../types/blogs.models'
//https://localhost.com
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get<BlogResponse>('http://localhost:3000/blogs')
  }

  postBlog({ name, description, websiteUrl }: PostBlogModel) {
    return this.http.post<IBlog>(
      'http://localhost:3000/blogs',
      {
        name,
        description,
        websiteUrl,
      },
      { withCredentials: true }
    )
  }
}
