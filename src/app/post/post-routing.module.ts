import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { PostsPageComponent } from './pages/posts-page/posts-page.component'
import { AddPostPageComponent } from './pages/add-post-page/add-post-page.component'
import { AuthGuard } from '../core/guards/auth-guard.guard'

export const postsRoutes: Routes = [
  { path: '', component: PostsPageComponent },
  { path: 'add-post', component: AddPostPageComponent, canActivate: [AuthGuard] },
]
@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
