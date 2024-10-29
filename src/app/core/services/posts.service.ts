import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  EditPostModel,
  IPost,
  PostAddToBlogModel,
  PostQueryParams,
  PostResponse,
} from '../../types/posts.models'

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

  deletePostById(postId: string) {
    return this.http.delete(`http://localhost:3000/posts/${postId}`, { withCredentials: true })
  }

  getPostById(postId: string) {
    return this.http.get<IPost>(`http://localhost:3000/posts/${postId}`, { withCredentials: true })
  }

  editPost({ title, shortDescription, content, postId, blogId }: EditPostModel) {
    return this.http.put(
      `http://localhost:3000/posts/${postId}`,
      {
        title,
        shortDescription,
        content,
        blogId,
      },
      { withCredentials: true }
    )
  }
}
