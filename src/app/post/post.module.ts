import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PostsPageComponent } from './pages/posts-page/posts-page.component'
import { PostsRoutingModule } from './post-routing.module'
import { SharedModule } from '../shared/shared.module'
import { AddPostPageComponent } from './pages/add-post-page/add-post-page.component'
import { AddPostFormComponent } from './pages/components/add-post-form/add-post-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { BlogModule } from '../blog/blog.module'

@NgModule({
  declarations: [PostsPageComponent, AddPostPageComponent, AddPostFormComponent],
  imports: [CommonModule, PostsRoutingModule, SharedModule, ReactiveFormsModule, BlogModule],
  exports: [PostsPageComponent, AddPostPageComponent, AddPostFormComponent],
})
export class PostModule {}
