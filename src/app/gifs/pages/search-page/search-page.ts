import { Component, inject, signal } from '@angular/core';
import { GifsList } from "../../components/gifs-images/gifs-list/gifs-list";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsList],
  templateUrl: './search-page.html'
})
export default class SearchPage {
  gifsService: GifsService = inject(GifsService);
  imagesUrl = signal<Gif[]>([]);

  onSearch(query: string): void {
    this.gifsService.searchTrendingGifs(query)
    .subscribe((resp) => {
      this.imagesUrl.set(resp);
    });
  }
 }
