import { Component, input, InputSignal } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Component({
  selector: 'app-gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.html'
})
export class GifsListItem {
  imageUrl: InputSignal<string> = input.required<string>();
}
