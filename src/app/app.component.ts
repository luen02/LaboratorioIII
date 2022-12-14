import { Component, OnInit, Input } from '@angular/core';
import { City } from './city';
import { CityService } from './cityservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
        :host ::ng-deep .p-dialog .country-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `,
  ],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cityDialog: boolean;

  cities: City[];

  city: City;

  selectedCities: City[];

  submitted: boolean;

  constructor(
    private cityService: CityService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.cityService.getCities().then((data) => (this.cities = data));
  }

  openNew() {
    this.city = {};
    this.submitted = false;
    this.cityDialog = true;
  }

  deleteSelectedCities() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar las ciudades seleccionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cities = this.cities.filter(
          (val) => !this.selectedCities.includes(val)
        );
        this.selectedCities = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Realizado con éxito',
          detail: 'Ciudad(es) eliminada(s)',
          life: 3000,
        });
      },
    });
  }

  editCity(city: City) {
    this.city = { ...city };
    this.cityDialog = true;
  }

  deleteCity(city: City) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar ' + city.ciudad + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cities = this.cities.filter((val) => val.id !== city.id);
        this.city = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Realizado con éxito',
          detail: 'Ciudad Eliminada',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.cityDialog = false;
    this.submitted = false;
  }

  saveCity() {
    this.submitted = true;

    if (this.city.ciudad.trim()) {
      if (this.city.id) {
        this.cities[this.findIndexById(this.city.id)] = this.city;
        this.messageService.add({
          severity: 'success',
          summary: 'Realizado con éxito',
          detail: 'Ciudad Actualizada',
          life: 3000,
        });
      } else {
        this.city.id = this.createId();
        this.cities.push(this.city);
        this.messageService.add({
          severity: 'success',
          summary: 'Realizado con éxito',
          detail: 'Ciudad Creada',
          life: 3000,
        });
      }

      this.cities = [...this.cities];
      this.cityDialog = false;
      this.city = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
