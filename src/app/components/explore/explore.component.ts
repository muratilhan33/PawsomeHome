import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoryRepository } from '../../models/category.repository';
import { PawRepository } from '../../models/paw.repository';
import { Category } from '../../models/category.model';
import { Paw } from '../../models/paw.model';
import { FormsComponent } from "./forms/forms.component";

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [RouterLink, NgFor, FormsComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {
  public selectedPaws: Paw[] = [];
  public selectedCategory: Category | null = null;

  constructor(
    private categoryRepository: CategoryRepository,
    private pawRepository: PawRepository) { }

  ngOnInit(): void {
    this.pawRepository.paws$.subscribe(() => {
      this.updateSelectedPaws();
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
    console.log("selected category: " + this.selectedCategory?.name);
    console.log("selected paws: " + this.selectedPaws);
  }
}
