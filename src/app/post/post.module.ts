import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostsPageComponent} from "./pages/posts-page/posts-page.component";
import {PostsRoutingModule} from "./post-routing.module";



@NgModule({
  declarations: [PostsPageComponent],
  imports: [
    CommonModule,
    PostsRoutingModule
  ],
  exports: [PostsPageComponent]
})
export class PostModule { }
