import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { MainComponent } from './main/main.component'
import { AuthGuard } from '../core/guards/auth-guard.guard'

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'blogs-page', pathMatch: 'full' },
      {
        path: 'blogs-page',
        loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule),
      },
      {
        path: 'posts-page',
        loadChildren: () => import('../post/post.module').then(m => m.PostModule),
      },
      {
        path: 'device-page',
        loadChildren: () => import('../devices/devices.module').then(m => m.DevicesModule),
        canLoad: [AuthGuard],
      },
      {
        path: 'profile-page',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
        canLoad: [AuthGuard],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRouterModule {}
