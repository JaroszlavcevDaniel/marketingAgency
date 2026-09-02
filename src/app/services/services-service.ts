import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesModel } from '../models/servicesModel';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  
   private api = "http://localhost:3000/api/services/";

  constructor(
    private http: HttpClient
  ) { }

  getServices(): Observable<any> {

    return this.http.get<any>(
      this.api + "getServices.php",
      {
        withCredentials: true
      }
    );

  }

  saveServices(services: ServicesModel): Observable<any> {

    return this.http.post<any>(
      this.api + "saveServices.php",
      services,
      {
        withCredentials: true
      }
    );

  }


}
