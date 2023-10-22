import { Component } from '@angular/core';


export interface Tile {
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-facturav1',
  templateUrl: './facturav1.component.html',
  styleUrls: ['./facturav1.component.css']
})
export class Facturav1Component {
  tiles: Tile[] = [
    {text: 'edificio1.jpg', cols: 1, rows: 2},
    {text: 'edificio2.jpg', cols: 1, rows: 2},
    {text: 'edificio4.jpg', cols: 1, rows: 2},
  ];
}
