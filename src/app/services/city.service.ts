import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';
import { RestService } from '../models/rest.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl: string = "http://localhost:3500/";
  constructor(private restService: RestService) { }

  getCities(): Observable<City[]> {
    return this.restService.getCities();
  }
}
