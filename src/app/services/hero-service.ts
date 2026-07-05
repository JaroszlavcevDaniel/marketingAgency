import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroModel } from '../models/heroModel';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private api = "http://localhost:3000/api/hero/";

  constructor(
    private http: HttpClient
  ) { }

  getHero(): Observable<any> {

    return this.http.get<any>(
      this.api + "getHero.php",
      {
        withCredentials: true
      }
    );

  }

  saveHero(hero: HeroModel): Observable<any> {

    return this.http.post<any>(
      this.api + "saveHero.php",
      hero,
      {
        withCredentials: true
      }
    );

  }

}