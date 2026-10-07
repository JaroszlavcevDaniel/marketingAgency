import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AboutModel } from '../models/aboutModel';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  

  private api = "https://n17.hu/api/about/";

  constructor(
    private http: HttpClient
  ) { }

  getAbout(): Observable<any> {

    return this.http.get<any>(
      this.api + "getAbout.php",
      {
        withCredentials: true
      }
    );

  }

  saveAbout(about: AboutModel): Observable<any> {

    return this.http.post<any>(
      this.api + "saveAbout.php",
      about,
      {
        withCredentials: true
      }
    );
    
    }
}
