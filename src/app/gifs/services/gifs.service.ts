import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import type { GiphyResponse } from "../interfaces/giphy.interfaces";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";

@Injectable({ providedIn: 'root'})
export class GifsService{

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

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
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}gifs/search`, {
      params: {
        api_key: environment.apiGifsKey,
        q: query,
        limit: '20',
        offset: '0',
        rating: 'g',
        bundle: 'messaging_non_clips'
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray( resp.data );
      console.log(gifs);
    });
  }

}
