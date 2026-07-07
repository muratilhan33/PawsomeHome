import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { Paw } from './paw.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseUrl: string = "http://localhost:3500/";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'categories');
  }

  getPaws(): Observable<Paw[]> {
    return this.http.get<Paw[]>(this.baseUrl + 'paws');
  }
}

