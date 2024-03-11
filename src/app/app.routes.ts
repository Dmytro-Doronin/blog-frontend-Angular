import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";

export const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'blogs', loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
];
