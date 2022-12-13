import { Component } from '@angular/core';
import { CountryService } from '../../countryservice';


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
      data: ['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Perú', 'Surinam', 'Uruguay', 'Venezuela'],
    },

    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [47327407, 11673021, 21255941, 19116201, 50882891, 17643054, 786552, 7132538, 33050325, 586632, 3473730, 28435940],
        type: 'bar',
      },
    ],
  };
}
