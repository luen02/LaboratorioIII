import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Country } from './country';

@Injectable()
export class CountryService {

    capitalNames: string[] = [
        "Buenos Aires",
        "La Paz",
        "Brasilia",
        "Santiago de Chile",
        "Bogotá",
        "Quito",
        "Georgetown",
        "Asunción",
        "Lima",
        "Paramaribo",
        "Montevideo",
        "Caracas",
    ];

    countryNames: string[] = [
        "Argentina",
        "Bolivia",
        "Brasil",
        "Chile",
        "Colombia",
        "Ecuador",
        "Guayana",
        "Paraguay",
        "Perú",
        "Surinam",
        "Uruguay",
        "Venezuela",
    ];

    constructor(private http: HttpClient) { }

    getCountriesSmall() {
        return this.http.get<any>('assets/countries-small.json')
        .toPromise()
        .then(res => <Country[]>res.data)
        .then(data => { return data; });
    }

    getCountries() {
        return this.http.get<any>('assets/countries.json')
        .toPromise()
        .then(res => <Country[]>res.data)
        .then(data => { return data; });
    }

    getCountriesWithOrdersSmall() {
        return this.http.get<any>('assets/countries-orders-small.json')
        .toPromise()
        .then(res => <Country[]>res.data)
        .then(data => { return data; });
    }

    generateCountry(): Country {
        const country: Country =  {
            id: this.generateId(),
            name: this.generateName(),
            capital: this.generateCapital(),
            numero_de_habitantes: this.generateNumero_de_habitantes(),
        };

        country.image = country.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
        return country;
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }

    generateName() {
        return this.countryNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generateCapital() {
        return this.capitalNames [Math.floor(Math.random() * Math.floor(30))];
    }
    generateNumero_de_habitantes() {
        return Math.floor(Math.random() * Math.floor(299)+1);
    }
}