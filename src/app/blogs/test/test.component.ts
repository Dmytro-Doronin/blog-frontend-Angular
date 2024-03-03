import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})

export class TestComponent {
  title?: string
  subtitle?: string
  loading? = true

  constructor() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  }
  setTitle (value: string) {
    this.title = value
  }
}
