import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'blog-download-img',
  templateUrl: './download-img.component.html',
  styleUrl: './download-img.component.scss',
})
export class DownloadImgComponent {
  @Output() addFileSubmitted = new EventEmitter<{ file: File }>()
  fileName: string | null = null
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement

    if (input.files && input.files.length > 0) {
      const file = input.files[0]
      const firstDotIndex = file.name.indexOf('.')
      const firstPart = file.name.slice(0, 5)
      const extension = file.name.slice(firstDotIndex)
      this.fileName = `${firstPart}...${extension}`
      this.addFileSubmitted.emit({ file })
    }
  }
}
