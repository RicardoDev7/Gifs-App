import { Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifsList } from "../../components/gifs-images/gifs-list/gifs-list";

@Component({
  selector: 'app-gif-history',
  imports: [GifsList],
  templateUrl: './gif-history.html'
})
export default class GifHistory {

  gifsService = inject(GifsService);

  query = toSignal(inject(ActivatedRoute).params.pipe(
    map(x => x['query'] ?? '')
  ));

  gifsByKey: Signal<Gif[]> = computed(() => this.gifsService.getHistoryGifs(this.query()));
}
