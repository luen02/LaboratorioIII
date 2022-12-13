import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { City } from './city';

@Injectable()
export class CityService {
  capitalNames: string[] = [
    'Buenos Aires',
    'La Paz',
    'Brasilia',
    'Santiago de Chile',
    'Bogotá',
    'Quito',
    'Georgetown',
    'Asunción',
    'Lima',
    'Paramaribo',
    'Montevideo',
    'Caracas',
  ];

  countryNames: string[] = [
    'Argentina',
    'Bolivia',
    'Brasil',
    'Chile',
    'Colombia',
    'Ecuador',
    'Guayana',
    'Paraguay',
    'Perú',
    'Surinam',
    'Uruguay',
    'Venezuela',
  ];

  constructor(private http: HttpClient) {}

  getCitiesSmall() {
    return this.http
      .get<any>('assets/cities-small.json')
      .toPromise()
      .then((res) => <City[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getCities() {
    return this.http
      .get<any>('assets/cities.json')
      .toPromise()
      .then((res) => <City[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getCitiesWithOrdersSmall() {
    return this.http
      .get<any>('assets/cities-orders-small.json')
      .toPromise()
      .then((res) => <City[]>res.data)
      .then((data) => {
        return data;
      });
  }

  generateCountry(): City {
    const country: City = {
      id: this.generateId(),
      name: this.generateName(),
      capital: this.generateCapital(),
      numero_de_habitantes: this.generateNumero_de_habitantes(),
    };

    return country;
  }

  generateId() {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateName() {
    return this.countryNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generateCapital() {
    return this.capitalNames[Math.floor(Math.random() * Math.floor(30))];
  }
  generateNumero_de_habitantes() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }
}
