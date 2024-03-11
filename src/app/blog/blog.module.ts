import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogsComponent} from "./blogs/blogs.component";
import {BlogRoutingModule} from "./blog-routing.module";



@NgModule({
  declarations: [BlogsComponent],
  exports: [
    BlogsComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
