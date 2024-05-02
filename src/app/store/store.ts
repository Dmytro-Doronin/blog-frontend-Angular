import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { provideStore } from '@ngrx/store';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(),
  ],
}).catch(err => console.error(err));
