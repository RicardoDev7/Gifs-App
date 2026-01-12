import { Component, input, InputSignal } from '@angular/core';
import { GifsListItem } from "../gifs-list-item/gifs-list-item";

@Component({
  selector: 'app-gifs-list',
  imports: [GifsListItem],
  templateUrl: './gifs-list.html'
})
export class GifsList {
  images: InputSignal<string[]> = input.required<string[]>();
}
