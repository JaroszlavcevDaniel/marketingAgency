import { Component, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('marketingAgency');

  isContactPage = false;

  constructor(private router: Router) {
    // Figyeljük az útvonal változásait
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Elrejtjük, ha a /contact (vagy a te kapcsolat útvonalad) aktív
      this.isContactPage = event.urlAfterRedirects.includes('/contact');
    });
  }

    scrollToTop(): void {
  window.scrollTo(0, 0);
  
  const container = document.querySelector('.scroll-container');
  if (container) {
    container.scrollTop = 0;
  }
}
}
