import { Component } from '@angular/core';
import { City } from '../../../models/city.model';
import { CityService } from '../../../services/city.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [NgFor],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  public cities: City[] = [];
  selectedCity: string = 'Şehir Seçin';

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.cityService.getCities().subscribe(c => {
      this.cities = c.sort((a, b) => a.name!.localeCompare(b.name!, 'tr'));
    })
  }

  changeCity(city: City) {
    this.selectedCity = city.name!;
  }

  resetFilters() {
    this.selectedCity = 'Şehir Seçin';
  }
}
