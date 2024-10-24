import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
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
