import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BlogQueryParams, BlogResponse, IBlog, PostBlogModel } from '../../types/blogs.models'
//https://localhost.com
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlogs(params: BlogQueryParams) {
    let httpParams = new HttpParams()

    if (params.searchNameTerm) {
      httpParams = httpParams.set('searchNameTerm', params.searchNameTerm)
    }
    if (params.sortBy) {
      httpParams = httpParams.set('sortBy', params.sortBy)
    }
    if (params.sortDirection) {
      httpParams = httpParams.set('sortDirection', params.sortDirection)
    }
    if (params.pageNumber !== undefined) {
      httpParams = httpParams.set('pageNumber', params.pageNumber.toString())
    }
    if (params.pageSize !== undefined) {
      httpParams = httpParams.set('pageSize', params.pageSize.toString())
    }

    return this.http.get<BlogResponse>('http://localhost:3000/blogs', { params: httpParams })
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
