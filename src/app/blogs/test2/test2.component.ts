import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.scss'
})
export class Test2Component {
<<<<<<< HEAD
  @Output() headerEvent = new EventEmitter<string>()
  title = ''
  headerEventHandler () {
    this.headerEvent.emit(this.title)
    this.title = ''
=======
  isDisabled = true

  constructor() {
    setTimeout(() => {
      this.isDisabled = false
    }, 2000)
>>>>>>> a9c80f5a4f2a6a1375915ddd9c2333cc9ddd446a
  }
}
