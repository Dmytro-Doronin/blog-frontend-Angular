import { HttpClient } from '@angular/common/http'

export class PostsService {
  constructor(private http: HttpClient) {}
  setLikeOrDislike(status: 'Like' | 'Dislike' | 'None', postId: string) {
    return this.http.put(
      `http://localhost:3000/posts/${postId}/like-status`,
      {
        status,
      },
      { withCredentials: true }
    )
  }
}
