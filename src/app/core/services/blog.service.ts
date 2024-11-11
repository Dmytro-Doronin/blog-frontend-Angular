import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  BlogQueryParams,
  BlogResponse,
  EditBlogModel,
  IBlog,
  PostBlogModel,
} from '../../types/blogs.models'
import { PostAddToBlogModel, PostQueryParams, PostResponse } from '../../types/posts.models'
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

  getBlogsForUser(params: BlogQueryParams) {
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

    return this.http.get<BlogResponse>('http://localhost:3000/blogs/user-blogs', {
      params: httpParams,
      withCredentials: true,
    })
  }

  postBlog({ name, description, websiteUrl, file }: PostBlogModel) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('websiteUrl', websiteUrl)
    if (file) {
      formData.append('image', file)
    }

    return this.http.post<IBlog>('http://localhost:3000/blogs', formData, { withCredentials: true })
  }

  editBlog({ name, description, websiteUrl, blogId, file }: EditBlogModel) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('websiteUrl', websiteUrl)
    if (file) {
      formData.append('image', file)
    }
    return this.http.put(`http://localhost:3000/blogs/${blogId}`, formData, {
      withCredentials: true,
    })
  }

  getBlogById(blogId: string) {
    return this.http.get<IBlog>(`http://localhost:3000/blogs/${blogId}`)
  }

  deleteBlogById(blogId: string) {
    return this.http.delete(`http://localhost:3000/blogs/${blogId}`, { withCredentials: true })
  }

  //posts
  getPostsForBlogs(postParams: PostQueryParams, id: string) {
    let httpParams = new HttpParams()

    if (postParams.sortBy) {
      httpParams = httpParams.set('sortBy', postParams.sortBy)
    }
    if (postParams.sortDirection) {
      httpParams = httpParams.set('sortDirection', postParams.sortDirection)
    }
    if (postParams.pageNumber !== undefined) {
      httpParams = httpParams.set('pageNumber', postParams.pageNumber.toString())
    }
    if (postParams.pageSize !== undefined) {
      httpParams = httpParams.set('pageSize', postParams.pageSize.toString())
    }

    return this.http.get<PostResponse>(`http://localhost:3000/blogs/${id}/posts`, {
      params: httpParams,
      withCredentials: true,
    })
  }

  addPostToBlog({ title, shortDescription, content, blogId, file }: PostAddToBlogModel) {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('shortDescription', shortDescription)
    formData.append('content', content)
    formData.append('blogId', blogId)
    if (file) {
      formData.append('image', file)
    }

    return this.http.post<IBlog>(`http://localhost:3000/blogs/${blogId}/posts`, formData, {
      withCredentials: true,
    })
  }
}
