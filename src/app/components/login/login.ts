import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
declare var bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login  {

  username: string = '';
  password: string = '';

  error: string = '';

  constructor(
    private authService: AuthService
  ) { }

  login(): void {

    this.error = '';

    this.authService.login(this.username, this.password).subscribe({

      next: (response) => {

        if (response.success) {

          // Angular értesítése
          this.authService.isLoggedIn$.next(true);

          // Modal bezárása
          const closeBtn = document.getElementById('closeLoginModal') as HTMLButtonElement;

          if (closeBtn) {
            closeBtn.click();
          }

          // Mezők ürítése
          this.username = '';
          this.password = '';

        } else {

          this.error = response.message;

        }

      },

      error: (err) => {

        console.error(err);
        this.error = 'Szerver hiba.';

      }

    });

  }

}