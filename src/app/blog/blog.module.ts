import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component'
import { BlogRoutingModule } from './blog-routing.module'
import { SharedModule } from '../shared/shared.module'
import { BlogAddPageComponent } from './pages/blog-add-page/blog-add-page.component'
import { AddBlogFormComponent } from './components/add-blog-form/add-blog-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthGuard } from '../core/guards/auth-guard.guard'
import { BlogEditPageComponent } from './pages/blog-edit-page/blog-edit-page.component'
import { EditBlogFormComponent } from './components/edit-blog-form/edit-blog-form.component'
import { BlogPageComponent } from './pages/blog-page/blog-page.component'
import { AddPostForBlogFormComponent } from './components/add-post-for-blog-form/add-post-for-blog-form.component'
import { AddPostToBlogPageComponent } from './pages/add-post-to-blog-page/add-post-to-blog-page.component'

@NgModule({
  providers: [AuthGuard],
  declarations: [
    BlogsPageComponent,
    BlogAddPageComponent,
    AddBlogFormComponent,
    BlogEditPageComponent,
    EditBlogFormComponent,
    BlogPageComponent,
    AddPostForBlogFormComponent,
    AddPostToBlogPageComponent,
  ],
  imports: [CommonModule, BlogRoutingModule, SharedModule, ReactiveFormsModule],
  exports: [
    AddBlogFormComponent,
    BlogEditPageComponent,
    EditBlogFormComponent,
    BlogsPageComponent,
    BlogPageComponent,
    AddPostForBlogFormComponent,
    AddPostToBlogPageComponent,
  ],
})
export class BlogModule {}
