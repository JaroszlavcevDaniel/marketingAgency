import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarModel } from '../models/navbarModel';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {

  private api = "https://n17.hu/api/navbar/";

  constructor(
    private http: HttpClient
  ) { }

  getNavbar(): Observable<any> {

    return this.http.get<any>(
      this.api + "getNavbar.php",
      {
        withCredentials: true
      }
    );

  }

  saveNavbar(navbar: NavbarModel): Observable<any> {

    return this.http.post<any>(
      this.api + "saveNavbar.php",
      navbar,
      {
        withCredentials: true
      }
    );

  }

}