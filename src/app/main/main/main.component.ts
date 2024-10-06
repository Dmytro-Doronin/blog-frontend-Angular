import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'blog-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  ngOnInit(): void {
    console.log('main ready')
  }
}
