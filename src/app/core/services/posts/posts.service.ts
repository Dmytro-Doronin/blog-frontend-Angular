import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  EditPostModel,
  IPost,
  PostAddToBlogModel,
  PostQueryParams,
  PostResponse,
} from '../../../types/posts.models'
import { baseVercelUrl } from '../services-variable'

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

    return this.http.get<PostResponse>(`${baseVercelUrl}/posts`, {
      params: httpParams,
      withCredentials: true,
    })
  }

  addNewPost({ title, shortDescription, content, blogId, file }: PostAddToBlogModel) {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('shortDescription', shortDescription)
    formData.append('content', content)
    formData.append('blogId', blogId)
    if (file) {
      formData.append('image', file)
    }

    return this.http.post<IPost>(`${baseVercelUrl}/posts`, formData, { withCredentials: true })
  }

  setLikeOrDislike(status: 'Like' | 'Dislike' | 'None', postId: string) {
    return this.http.put(
      `${baseVercelUrl}/posts/${postId}/like-status`,
      {
        likeStatus: status,
      },
      { withCredentials: true }
    )
  }

  deletePostById(postId: string) {
    return this.http.delete(`${baseVercelUrl}/posts/${postId}`, { withCredentials: true })
  }

  getPostById(postId: string) {
    return this.http.get<IPost>(`${baseVercelUrl}/posts/${postId}`, { withCredentials: true })
  }

  editPost({ title, shortDescription, content, postId, blogId, file }: EditPostModel) {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('shortDescription', shortDescription)
    formData.append('content', content)
    formData.append('blogId', blogId)
    if (file) {
      formData.append('image', file)
    }

    return this.http.put(`${baseVercelUrl}/posts/${postId}`, formData, {
      withCredentials: true,
    })
  }
}
