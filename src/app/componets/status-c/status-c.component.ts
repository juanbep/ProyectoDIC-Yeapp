import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Punto Fisico', weight: 26000000, symbol: '21/6/2023'},
  {position: 2, name: 'linea', weight: 26000000, symbol: '21/8/2023'},
  {position: 3, name: 'Linea', weight: 26000000, symbol: '21/9/2023'},
  {position: 4, name: 'tarjeta Debito', weight: 26000000, symbol: '21/10/2023'},
  
];

@Component({
  selector: 'app-status-c',
  templateUrl: './status-c.component.html',
  styleUrls: ['./status-c.component.css']
})
export class StatusCComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
