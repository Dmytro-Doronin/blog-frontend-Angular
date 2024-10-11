import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component'
import { BlogAddPageComponent } from './pages/blog-add-page/blog-add-page.component'

export const blogRoutes: Routes = [
  { path: '', component: BlogsPageComponent },
  { path: 'add-blog', component: BlogAddPageComponent },
]
@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
