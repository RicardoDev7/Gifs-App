import { Component, input, InputSignal } from '@angular/core';
import { GifsListItem } from "../gifs-list-item/gifs-list-item";
import { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Component({
  selector: 'app-gifs-list',
  imports: [GifsListItem],
  templateUrl: './gifs-list.html'
})
export class GifsList {
  images: InputSignal<Gif[]> = input.required<Gif[]>();
}
