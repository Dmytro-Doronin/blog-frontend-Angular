import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { RouterModule, RouterOutlet } from '@angular/router'

import { AppComponent } from './app.component'
import { appReducer } from './store/reducers/app.reducer'
import { authReducer } from './store/reducers/auth.reducer'
import { AuthEffects } from './store/effects/auth.effects'
import { NgSelectModule } from '@ng-select/ng-select'

import { AppRouterModule, routes } from './app-router.module'
import { TokenInterceptor } from './core/interceptors/token.interceptor'
import { BlogModule } from './blog/blog.module'
import { AuthModule } from './auth/auth.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from './shared/shared.module'
import { MainModule } from './main/main.module'
import { blogsReducer } from './store/reducers/blogs.reducer'
import { BlogsEffects } from './store/effects/blogs.effects'

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterOutlet,
    HttpClientModule,
    AuthModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRouterModule,
    CommonModule,
    MainModule,
    NgSelectModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      app: appReducer,
      auth: authReducer,
      blogs: blogsReducer,
    }),
    EffectsModule.forRoot([AuthEffects, BlogsEffects]),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
