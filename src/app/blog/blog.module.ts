import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component'
import { BlogRoutingModule } from './blog-routing.module'
import { SharedModule } from '../shared/shared.module'
import { BlogItemComponent } from './components/blog-item/blog-item.component'
import { BlogAddPageComponent } from './pages/blog-add-page/blog-add-page.component'
import { AddBlogFormComponent } from './components/add-blog-form/add-blog-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthGuard } from '../core/guards/auth-guard.guard'
import { BlogControlMenuComponent } from './components/blog-control-menu/blog-control-menu.component'
import { BlogEditPageComponent } from './pages/blog-edit-page/blog-edit-page.component'
import { EditBlogFormComponent } from './components/edit-blog-form/edit-blog-form.component'

@NgModule({
  providers: [AuthGuard],
  declarations: [
    BlogsPageComponent,
    BlogItemComponent,
    BlogAddPageComponent,
    AddBlogFormComponent,
    BlogControlMenuComponent,
    BlogEditPageComponent,
    EditBlogFormComponent,
  ],
  imports: [CommonModule, BlogRoutingModule, SharedModule, ReactiveFormsModule],
  exports: [
    BlogItemComponent,
    AddBlogFormComponent,
    BlogControlMenuComponent,
    BlogEditPageComponent,
    EditBlogFormComponent,
  ],
})
export class BlogModule {}
