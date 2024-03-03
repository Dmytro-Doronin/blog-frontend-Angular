import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.scss'
})
export class Test2Component {
  @Output() headerEvent = new EventEmitter<string>()
  title = ''
  headerEventHandler () {
    this.headerEvent.emit(this.title)
    this.title = ''
  }
}
