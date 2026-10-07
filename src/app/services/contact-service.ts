import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactModel } from '../models/contactModel';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  

  private api = "https://n17.hu/api/contact/";

  constructor(
    private http: HttpClient
  ) { }

  getContact(): Observable<any> {

    return this.http.get<any>(
      this.api + "getContact.php",
      {
        withCredentials: true
      }
    );

  }

  saveContact(about: ContactModel): Observable<any> {

    return this.http.post<any>(
      this.api + "saveContact.php",
      about,
      {
        withCredentials: true
      }
    );
    
    }
    
}
