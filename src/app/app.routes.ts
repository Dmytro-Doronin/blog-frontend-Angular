import { Routes } from '@angular/router'

export const routes: Routes = [
  // { path: 'auth-login', component: AuthLoginComponent },
  { path: 'blogs', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
]
