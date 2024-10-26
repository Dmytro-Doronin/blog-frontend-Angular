import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostsPageComponent} from "./pages/posts-page/posts-page.component";
import {PostsRoutingModule} from "./post-routing.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [PostsPageComponent],
    imports: [
        CommonModule,
        PostsRoutingModule,
        SharedModule
    ],
  exports: [PostsPageComponent]
})
export class PostModule { }
