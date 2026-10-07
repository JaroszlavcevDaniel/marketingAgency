import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FooterModel } from '../models/footerModel';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  
  private api = "https://n17.hu/api/footer/";

  constructor(
    private http: HttpClient
  ) { }

  getFooter(): Observable<any> {

    return this.http.get<any>(
      this.api + "getFooter.php",
      {
        withCredentials: true
      }
    );

  }

  saveFooter(footer: FooterModel): Observable<any> {

    return this.http.post<any>(
      this.api + "saveFooter.php",
      footer,
      {
        withCredentials: true
      }
    );

  }

}
