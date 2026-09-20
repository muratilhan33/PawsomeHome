import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Category } from './category.model';
import { Paw } from './paw.model';
import { City } from './city.model';
import { DATA_URL } from '../config';

interface AppData {
  categories: Category[];
  paws: Paw[];
  cities: City[];
}


@Injectable({
  providedIn: 'root'
})
export class RestService {
  // baseUrl: string = "http://localhost:3500/";
  private data$: Observable<AppData>;

  constructor(private http: HttpClient) {
    this.data$ = this.http.get<AppData>(DATA_URL).pipe(shareReplay(1));
  }

  getCategories(): Observable<Category[]> {
    // return this.http.get<Category[]>(this.baseUrl + 'categories');
    return this.data$.pipe(map(data => data.categories));
  }

  getPaws(): Observable<Paw[]> {
    // return this.http.get<Paw[]>(this.baseUrl + 'paws');
    return this.data$.pipe(map(data => data.paws));
  }

  getCities(): Observable<City[]> {
    // return this.http.get<City[]>(this.baseUrl + 'cities');
    return this.data$.pipe(map(data => data.cities));
  }
}

