import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { PostsPageComponent } from './pages/posts-page/posts-page.component'
import { AddPostPageComponent } from './pages/add-post-page/add-post-page.component'
import { AuthGuard } from '../core/guards/auth-guard.guard'
import { EditPostPageComponent } from './pages/edit-post-page/edit-post-page.component'
import { PostPageComponent } from './pages/post-page/post-page.component'

export const postsRoutes: Routes = [
  { path: '', component: PostsPageComponent },
  { path: 'add-post', component: AddPostPageComponent, canActivate: [AuthGuard] },
  { path: 'edit-post', component: EditPostPageComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostPageComponent },
]
@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
