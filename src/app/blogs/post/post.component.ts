import {Component, OnInit} from '@angular/core';
import {Post} from "./interface";
import {Observable} from "rxjs";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'blog-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})


export class PostComponent implements OnInit{

  posts$!: Observable<Post[]>

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.posts$

    this.getPosts()
  }

  getPosts() {
    this.postService.getPosts()
  }

  deletePost(id: number) {
    this.postService.deletePostService(id)
  }

}

