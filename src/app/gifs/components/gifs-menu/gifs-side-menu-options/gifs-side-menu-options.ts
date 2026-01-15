import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifsService } from 'src/app/gifs/services/gifs.service';

interface MenuOption {
  label: string;
  sublabel: string;
  router: string;
  icon: string;
}

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.html',
})
export class GifsSideMenuOptions {
  gifsService = inject(GifsService);

  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      sublabel: 'Gifs más populares',
      router: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line'
    },
    {
      label: 'Buscador',
      sublabel: 'Buscar gifs',
      router: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass'
    }
  ]

  gifsHistory: Signal<string[]> = this.gifsService.searchHistoryKey;

}
