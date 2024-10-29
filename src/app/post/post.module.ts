import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PostsPageComponent } from './pages/posts-page/posts-page.component'
import { PostsRoutingModule } from './post-routing.module'
import { SharedModule } from '../shared/shared.module'
import { AddPostPageComponent } from './pages/add-post-page/add-post-page.component'
import { AddPostFormComponent } from './components/add-post-form/add-post-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { BlogModule } from '../blog/blog.module'
import { EditPostPageComponent } from './pages/edit-post-page/edit-post-page.component'
import { EditPostFormComponent } from './components/edit-post-form/edit-post-form.component'
import { PostPageComponent } from './pages/post-page/post-page.component'

@NgModule({
  declarations: [
    PostsPageComponent,
    AddPostPageComponent,
    AddPostFormComponent,
    EditPostPageComponent,
    EditPostFormComponent,
    PostPageComponent,
  ],
  imports: [CommonModule, PostsRoutingModule, SharedModule, ReactiveFormsModule, BlogModule],
  exports: [
    PostsPageComponent,
    AddPostPageComponent,
    AddPostFormComponent,
    EditPostPageComponent,
    EditPostFormComponent,
    PostPageComponent,
  ],
})
export class PostModule {}
