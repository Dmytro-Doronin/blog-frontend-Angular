import {Component, OnInit} from '@angular/core'
import {Observable} from "rxjs";
import {selectIsAuthenticated} from "../../../store/selectors/auth.selector";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'blog-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
})
export class BlogPageComponent implements OnInit{
  isAuthenticated$?: Observable<boolean>
  blogId: string | null = null
  constructor(private store: Store, private route: ActivatedRoute) {}


  ngOnInit() {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
    this.blogId = this.route.snapshot.paramMap.get('id');
  }


}
