import { Component } from '@angular/core'
import { AuthPageComponent } from '../../auth-page/auth-page.component'
import { RecoveryFormComponent } from '../recovery-form/recovery-form.component'

@Component({
  selector: 'blog-recovery-page',
  standalone: true,
  imports: [AuthPageComponent, RecoveryFormComponent],
  templateUrl: './recovery-page.component.html',
  styleUrl: './recovery-page.component.scss',
})
export class RecoveryPageComponent {}
