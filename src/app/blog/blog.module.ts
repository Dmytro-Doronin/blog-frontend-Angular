import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component'
import { BlogRoutingModule } from './blog-routing.module'
import { SharedModule } from '../shared/shared.module'
import { BlogItemComponent } from './components/blog-item/blog-item.component'
import { BlogAddPageComponent } from './pages/blog-add-page/blog-add-page.component'

@NgModule({
  providers: [],
  declarations: [BlogsPageComponent, BlogItemComponent, BlogAddPageComponent],
  imports: [CommonModule, BlogRoutingModule, SharedModule],
  exports: [BlogItemComponent],
})
export class BlogModule {}
