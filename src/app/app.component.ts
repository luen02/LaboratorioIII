import { Component, OnInit, Input } from '@angular/core';
import { Country } from './country';
import { CountryService } from './countryservice';
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
  countryDialog: boolean;

  countries: Country[];

  country: Country;

  selectedCountries: Country[];

  submitted: boolean;

  constructor(
    private countryService: CountryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.countryService.getCountries().then((data) => (this.countries = data));
  }

  openNew() {
    this.country = {};
    this.submitted = false;
    this.countryDialog = true;
  }

  deleteSelectedCountries() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected countries?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.countries = this.countries.filter(
          (val) => !this.selectedCountries.includes(val)
        );
        this.selectedCountries = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Countries Deleted',
          life: 3000,
        });
      },
    });
  }

  editCountry(country: Country) {
    this.country = { ...country };
    this.countryDialog = true;
  }

  deleteCountry(country: Country) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + country.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.countries = this.countries.filter((val) => val.id !== country.id);
        this.country = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Country Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.countryDialog = false;
    this.submitted = false;
  }

  saveCountry() {
    this.submitted = true;

    if (this.country.name.trim()) {
      if (this.country.id) {
        this.countries[this.findIndexById(this.country.id)] = this.country;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Country Updated',
          life: 3000,
        });
      } else {
        this.country.id = this.createId();
        this.country.image = 'country-placeholder.svg';
        this.countries.push(this.country);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Country Created',
          life: 3000,
        });
      }

      this.countries = [...this.countries];
      this.countryDialog = false;
      this.country = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].id === id) {
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

