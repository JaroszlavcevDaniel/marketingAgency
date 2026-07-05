import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private api = "http://localhost:3000/api/auth/";

  // Ez tárolja a bejelentkezési állapotot, amire a komponensek feliratkoznak
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      this.api + "login.php",
      { username, password },
      { withCredentials: true }
    );
  }

  logout(): void {
    // 1. Azonnal átállítjuk a frontend állapotot hamisra, hogy a gombok eltűnjenek
    this.isLoggedIn$.next(false);

    // 2. Szólunk a PHP backendnek is (ha van logout.php), hogy törölje a sütit/session-t
    this.http.post<any>(this.api + "logout.php", {}, { withCredentials: true }).subscribe({
      next: (res) => {
        console.log('Sikeres szerveroldali kijelentkezés.');
      },
      error: (err) => {
        console.error('Szerver hiba a kijelentkezéskor, de a kliens oldalon kiléptünk.', err);
      }
    });
  }

  check(): Observable<any> {
    return this.http.get<any>(
      this.api + "check.php",
      { withCredentials: true }
    );
  }

  loadSession(): void {
    this.check().subscribe({
      next: (res) => {
        if (res && res.loggedIn !== undefined) {
          this.isLoggedIn$.next(res.loggedIn);
        }
      },
      error: (err) => {
        console.error('Nem sikerült ellenőrizni a munkamenetet:', err);
        this.isLoggedIn$.next(false);
      }
    });
  }
}