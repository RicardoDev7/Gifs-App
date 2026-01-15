import { Component, computed, inject, Signal } from '@angular/core';
import { GifsList } from "../../components/gifs-images/gifs-list/gifs-list";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-trending-page',
  imports: [GifsList],
  templateUrl: './trending-page.html'
})
export default class TrendingPage {
  gifsService: GifsService = inject(GifsService);
  imageUrls: Signal<Gif[]> = computed(() => this.gifsService.trendingGifs());
}
