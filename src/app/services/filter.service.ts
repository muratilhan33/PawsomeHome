import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PawFilters {
  city?: string;
  age?: string;
  gender?: string;
}

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  private filter: PawFilters = { city: '', age: '', gender: '' };

  private filterSubject = new BehaviorSubject<PawFilters>(this.filter);

  filters$ = this.filterSubject.asObservable();

  updateFilters(newFilters: Partial<PawFilters>) {
    const current = this.filterSubject.value;
    this.filterSubject.next(newFilters);
    console.log(current);
  }

  resetFilters() {
    this.filterSubject.next(this.filter);
  }

  constructor() { }
}
