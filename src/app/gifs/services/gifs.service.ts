import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { environment } from "@environments/environment";
import type { GiphyResponse } from "../interfaces/giphy.interfaces";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, Observable, tap } from "rxjs";

function loadFromLocalStorage() : Record<string, Gif[]>{
  const data = localStorage.getItem('gifs-history');
  return data ? JSON.parse(data) : {};
}

@Injectable({ providedIn: 'root'})
export class GifsService{

  private http: HttpClient = inject(HttpClient);

  trendingGifs: WritableSignal<Gif[]> = signal<Gif[]>([]);
  trendingGifsLoading: WritableSignal<boolean> = signal(true);

  searchHistory: WritableSignal<Record<string, Gif[]>> = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKey: Signal<string[]> = computed(() => Object.keys(this.searchHistory()));

  constructor(){
    this.loadTrendingGifs();
  }

  saveToLocalStorage = effect(() => {
    localStorage.setItem('gifs-history', JSON.stringify(this.searchHistory()));
  });

  loadTrendingGifs() : void {
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}gifs/trending`, {
      params: {
        api_key: environment.apiGifsKey,
        limit: '20',
        offset: '0',
        rating: 'g',
        bundle: 'messaging_non_clips'
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray( resp.data );
      this.trendingGifs.set( gifs );
      this.trendingGifsLoading.set( false );
    });
  }

  searchTrendingGifs(query: string): Observable<Gif[]>{
    return this.http.get<GiphyResponse>(`${environment.giphyApiUrl}gifs/search`, {
      params: {
        api_key: environment.apiGifsKey,
        q: query,
        limit: '20',
        offset: '0',
        rating: 'g',
        bundle: 'messaging_non_clips'
      }
    }).pipe(
      map(x => GifMapper.mapGiphyItemsToGifArray( x.data )),
      tap(x => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLowerCase()]: x
        }));
      })
    );
  }

  getHistoryGifs(query: string) : Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
