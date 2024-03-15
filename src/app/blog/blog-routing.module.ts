import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BlogsComponent } from './blogs/blogs.component'

const blogRoutes: Routes = [{ path: 'blogs', component: BlogsComponent }]

@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
