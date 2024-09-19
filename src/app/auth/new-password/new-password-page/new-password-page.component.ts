import { Component, OnInit } from '@angular/core'
import { AuthPageComponent } from '../../auth-page/auth-page.component'
import { NewPasswordFormComponent } from '../new-password-form/new-password-form.component'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'blog-new-password-page',
  standalone: true,
  imports: [AuthPageComponent, NewPasswordFormComponent],
  templateUrl: './new-password-page.component.html',
  styleUrl: './new-password-page.component.scss',
})
export class NewPasswordPageComponent implements OnInit {
  recoveryCode: string | null = ''

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.recoveryCode = params.get('recoveryCode')
    })
  }
}
