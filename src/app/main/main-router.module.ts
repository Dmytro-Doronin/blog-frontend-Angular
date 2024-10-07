import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { MainComponent } from './main/main.component'
import {PostModule} from "../post/post.module";

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'blogs-page', pathMatch: 'full' },
      { path: 'blogs-page', loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule) },
      { path: 'posts-page', loadChildren: () => import('../post/post.module').then(m => m.PostModule) },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRouterModule {}
