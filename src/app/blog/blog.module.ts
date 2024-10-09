import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component'
import { BlogRoutingModule } from './blog-routing.module'
import { SharedModule } from '../shared/shared.module'
import { BlogItemComponent } from './components/blog-item/blog-item.component'

@NgModule({
  providers: [],
  declarations: [BlogsPageComponent, BlogItemComponent],
  imports: [CommonModule, BlogRoutingModule, SharedModule],
  exports: [BlogItemComponent],
})
export class BlogModule {}
