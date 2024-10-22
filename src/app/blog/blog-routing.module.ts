import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component'
import { BlogAddPageComponent } from './pages/blog-add-page/blog-add-page.component'
import { AuthGuard } from '../core/guards/auth-guard.guard'
import { BlogEditPageComponent } from './pages/blog-edit-page/blog-edit-page.component'
import { BlogPageComponent } from './pages/blog-page/blog-page.component'
import {AddPostForBlogFormComponent} from "./components/add-post-for-blog-form/add-post-for-blog-form.component";
import {AddPostToBlogPageComponent} from "./pages/add-post-to-blog-page/add-post-to-blog-page.component";

export const blogRoutes: Routes = [
  { path: '', component: BlogsPageComponent },
  { path: 'add-blog', component: BlogAddPageComponent, canActivate: [AuthGuard] },
  { path: 'edit-blog', component: BlogEditPageComponent, canActivate: [AuthGuard] },
  { path: 'blog/:id', component: BlogPageComponent},
  { path: 'blog/:id/add-post-for-blog', component: AddPostToBlogPageComponent},

]
@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
