import { Component } from '@angular/core';
import { CityService } from '../../cityservice';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
})
export class BarchartComponent {
  constructor() {}

  ngOnInit(): void {}

  options: any = {
    xAxis: {
      type: 'category',
      data: [
        'Lima',
        'Arequipa',
        'Trujillo',
        'Cusco',
        'Chiclayo',
        'Huaraz',
        'Huancayo',
        'Ayacucho',
        'Iquitos',
        'Piura',
      ],
    },

    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [
          9943800, 1142900, 1088300, 437538, 562508, 123069, 400271,
          228427, 163502, 560345,
        ],
        type: 'bar',
      },
    ],
  };
}
