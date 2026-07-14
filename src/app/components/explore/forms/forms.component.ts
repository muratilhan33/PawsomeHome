import { Component, OnInit } from '@angular/core';
import { City } from '../../../models/city.model';
import { CityService } from '../../../services/city.service';
import { NgFor } from '@angular/common';
import { FilterService } from '../../../services/filter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  public cities: City[] = [];
  selectedCity: string = 'Şehir Seçin';
  selectedAge: string = 'all';
  selectedGender: string = 'all';

  constructor(private cityService: CityService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.cityService.getCities().subscribe(c => {
      this.cities = c.sort((a, b) => a.name!.localeCompare(b.name!, 'tr'));
    })

    this.filterService.filters$.subscribe(filters => {
      this.selectedCity = (filters.city === 'Tümü' || !filters.city) ? 'Şehir Seçin' : filters.city!;
      this.selectedAge = filters.age!;
      this.selectedGender = filters.gender!;
    })
  }

  changeCity(city: City) {
    this.selectedCity = city.name!;
    this.applyFilters();
  }

  applyFilters() {
    this.filterService.updateFilters({
      city: this.selectedCity === 'Şehir Seçin' ? 'Tümü' : this.selectedCity,
      age: this.selectedAge,
      gender: this.selectedGender
    })
  }

  resetFilters() {
    const ageAll = document.getElementById('ageAll') as HTMLInputElement;
    const genderAll = document.getElementById('genderAll') as HTMLInputElement;
    this.selectedCity = 'Şehir Seçin';
    this.selectedAge = 'all';
    this.selectedGender = 'all';
    this.applyFilters();
  }
}
