import { Component } from '@angular/core';
import { MemeService } from '../../shared/services/meme.service';
import { MemeDTO } from '../../shared/models/meme.dto';
import { MemeCardComponent } from "../../shared/components/meme-card/meme-card.component";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-meme-list',
    imports: [MemeCardComponent],
    templateUrl: './meme-list.component.html',
    styleUrl: './meme-list.component.css'
})
export class MemeListComponent {
memes: MemeDTO[] = [];
  loading = true;
  isRandom = false;

  constructor(
    private memeService: MemeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isRandom = this.route.snapshot.routeConfig?.path === 'random';

    this.memeService.getMemes().subscribe(memes => {
      this.memes = this.isRandom ? this.shuffle(memes) : memes;
      this.loading = false;
    });
  }

  private shuffle(array: MemeDTO[]): MemeDTO[] {
    return array
      .map(meme => ({ meme, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(obj => obj.meme);
  }
}
