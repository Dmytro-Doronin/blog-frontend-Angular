import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlogsComponent } from './blogs/blogs.component'
import { BlogRoutingModule } from './blog-routing.module'

@NgModule({
  providers: [],
  declarations: [],
  imports: [CommonModule, BlogRoutingModule, BlogsComponent],
})
export class BlogModule {}
