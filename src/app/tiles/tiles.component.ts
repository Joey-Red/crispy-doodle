import { Component } from '@angular/core';

@Component({
  selector: 'app-tiles',
  standalone: true,
  imports: [],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.css',
})
export class TilesComponent {
  tiles: tile[] = [
    {
      title: 'Gear Switcher',
      background: './assets/tile-covers/gs.png',
      link: '#/gs',
    },
    {
      title: 'JSON Linter',
      background: './assets/tile-covers/linter.png',
      link: '#/json',
    },
    {
      title: 'Speed Type',
      background: './assets/tile-covers/speed_type.png',
      link: '#/speed',
    },
    {
      title: '404',
      background: './assets/tile-covers/fof.png',
      link: '#/404',
    },
  ];
}

interface tile {
  title: string;
  background: string;
  link: string;
}
