import { Routes } from '@angular/router'

export const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'blogs', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
]
