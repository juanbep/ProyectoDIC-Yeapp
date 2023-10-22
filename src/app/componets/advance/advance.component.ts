import { Component } from '@angular/core';
export interface Tile {
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.css']
})
export class AdvanceComponent {
  tiles: Tile[] = [
    {text: 'edificio1.jpg', cols: 1, rows: 2},
    {text: 'edificio2.jpg', cols: 1, rows: 2},
    {text: 'edificio4.jpg', cols: 1, rows: 2},
  ];
}
