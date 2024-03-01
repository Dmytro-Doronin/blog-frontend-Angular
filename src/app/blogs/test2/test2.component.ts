import { Component } from '@angular/core';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.scss'
})
export class Test2Component {
  isDisabled = true

  constructor() {
    setTimeout(() => {
      this.isDisabled = false
    }, 2000)
  }
}
