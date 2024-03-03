import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {Post} from "../blogs/post/interface";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([])

  constructor(private http: HttpClient) {}


  getPosts() {
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(todos => {
        this.posts$.next(todos)
      })
  }

  deletePostService(id: number) {
    this.http.delete<Post[]>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .pipe(map( () => {
        return this.posts$.getValue().filter(post => post.id !== id )
      }))
      .subscribe(todos => {
        this.posts$.next(todos)
      })
  }

}
