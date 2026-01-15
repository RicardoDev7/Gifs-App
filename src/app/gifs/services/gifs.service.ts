import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import type { GiphyResponse } from "../interfaces/giphy.interfaces";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, tap } from "rxjs";

@Injectable({ providedIn: 'root'})
export class GifsService{

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));

  constructor(){
    this.loadTrendingGifs();
  }

  loadTrendingGifs(){
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

  searchTrendingGifs(query: string){
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

}
