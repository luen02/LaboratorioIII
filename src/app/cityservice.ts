import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { City } from './city';

@Injectable()
export class CityService {
  alcaldeNames: string[] = [
    'Miguel Romero Sotelo',
    'Omar Julio Candia Aguilar',
    'Daniel Marcelo Jacinto',
    'Víctor G. Boluarte Medina',
    'Marcos Gasco Arrobas',
    'Cesar Martin Bustamante Flores',
    'Juan Carlos Quispe Ledesma',
    'Yuri Alberto Gutiérrez Gutiérrez',
    'Francisco Sanjurjo Dávila',
    'Juan Díaz Dios',
  ];

  cityNames: string[] = [
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
