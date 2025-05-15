import { Component, Input } from '@angular/core';
import { MemeDTO } from '../../models/meme.dto';

@Component({
    selector: 'app-meme-card',
    imports: [],
    templateUrl: './meme-card.component.html',
    styleUrl: './meme-card.component.css'
})
export class MemeCardComponent {
  @Input() meme!: MemeDTO;
  likes = 0;

  addLike() {
    this.likes++;
  }
}
