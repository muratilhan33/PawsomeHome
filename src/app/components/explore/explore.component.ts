import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoryRepository } from '../../models/category.repository';
import { PawRepository } from '../../models/paw.repository';
import { Category } from '../../models/category.model';
import { Paw } from '../../models/paw.model';
import { FormsComponent } from "./forms/forms.component";
import { FilterService, PawFilters } from '../../services/filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [RouterLink, NgFor, FormsComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent implements OnInit, OnDestroy {
  public selectedPaws: Paw[] = [];
  public selectedCategory: Category | null = null;
  public filterSubscription!: Subscription;

  constructor(
    private categoryRepository: CategoryRepository,
    private pawRepository: PawRepository,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.pawRepository.paws$.subscribe(() => {
      this.updateSelectedPaws();
    })

    this.filterSubscription = this.filterService.filters$.subscribe((filters: PawFilters) => {
      this.filterData(filters);
    })
  }

  get categories(): Category[] {
    return this.categoryRepository.getCategories();
  }

  get paws(): Paw[] {
    return this.pawRepository.getPaws(null);
  }

  changeCategory(newCategory?: Category) {
    this.selectedCategory = newCategory || null; // Eğer kategori yoksa tüm ürünleri göster
    this.updateSelectedPaws();
  }

  updateSelectedPaws(): void {
    this.selectedPaws = this.pawRepository.getPaws(this.selectedCategory);
    this.filterService.filters$.subscribe((filters: PawFilters) => {
      this.filterData(filters);
    })
  }

  filterData(filters: PawFilters) {
    this.selectedPaws = this.pawRepository.getPaws(this.selectedCategory).filter(item => {
      const matchCity = filters.city === 'Tümü' || item.city === filters.city;
      const matchAge = filters.age === 'all' || item.age === filters.age;
      const matchGender = filters.gender === 'all' || item.gender === filters.gender;

      return matchCity && matchAge && matchGender;
    })

  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
