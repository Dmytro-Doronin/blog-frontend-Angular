import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { IPost, PostAddToBlogModel, PostQueryParams, PostResponse } from '../../types/posts.models'
import { IBlog, PostBlogModel } from '../../types/blogs.models'

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(params: PostQueryParams) {
    let httpParams = new HttpParams()

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

    return this.http.get<PostResponse>('http://localhost:3000/posts', {
      params: httpParams,
      withCredentials: true,
    })
  }

  addNewPost({ title, shortDescription, content, blogId }: PostAddToBlogModel) {
    return this.http.post<IPost>(
      'http://localhost:3000/posts',
      {
        title,
        shortDescription,
        content,
        blogId,
      },
      { withCredentials: true }
    )
  }

  setLikeOrDislike(status: 'Like' | 'Dislike' | 'None', postId: string) {
    return this.http.put(
      `http://localhost:3000/posts/${postId}/like-status`,
      {
        likeStatus: status,
      },
      { withCredentials: true }
    )
  }
}
