import { Routes } from '@angular/router'
import { ErrorPageComponent } from './shared/components/404/404.component'

export const routes: Routes = [
  { path: '', redirectTo: 'blogs', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', component: ErrorPageComponent },
]
