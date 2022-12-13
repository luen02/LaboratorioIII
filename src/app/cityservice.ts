import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { City } from './city';

@Injectable()
export class CityService {
  alcaldeNames: string[] = [
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

  cityNames: string[] = [
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

  generateCity(): City {
    const city: City = {
      id: this.generateId(),
      ciudad: this.generateCiudad(),
      alcalde: this.generateAlcalde(),
      numero_de_habitantes: this.generateNumero_de_habitantes(),
    };

    return city;
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

  generateCiudad() {
    return this.cityNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generateAlcalde() {
    return this.alcaldeNames[Math.floor(Math.random() * Math.floor(30))];
  }
  generateNumero_de_habitantes() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }
}
