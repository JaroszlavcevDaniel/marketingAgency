import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language-service';
import { NavbarService } from '../../services/navbar-service';
import { NavbarModel } from '../../models/navbarModel';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements  OnInit {

  isMenuCollapsed: boolean = true;

  currentLang: 'hu' | 'en' = 'hu';

  isScrolled = false;

  navbar?: NavbarModel;

  isAdmin = false;

  editModel?: NavbarModel;

  constructor(
    private languageService: LanguageService,
    private navbarService: NavbarService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Feliratkozunk a nyelvi változásokra
    this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
      this.cdr.detectChanges();
    });

    // Feliratkozunk a bejelentkezési állapotra
    this.authService.isLoggedIn$.subscribe(logged => {
      this.isAdmin = logged;
      this.cdr.detectChanges();
    });

    if (typeof this.authService.loadSession === 'function') {
      this.authService.loadSession();
    }
    this.loadNavbar();
  }

  loadNavbar() {
    this.navbarService.getNavbar().subscribe({
      next: (response) => {
        this.navbar = response.data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openEditModal() {
    if (this.navbar) {
      this.editModel = { ...this.navbar };
    }
  }

  saveNavbar() {
    if (!this.editModel) return;

    this.navbarService.saveNavbar(this.editModel).subscribe({
      next: (response) => {
        if (response && response.success) {
          
          const closeBtn = document.getElementById('closeEditModalBtn') as HTMLButtonElement;
          if (closeBtn) {
            closeBtn.click();
          }

          this.navbar = { ...this.editModel } as NavbarModel;

          setTimeout(() => {
            this.loadNavbar();
          }, 300);

        } else {
          alert('Hiba történt a mentés során.');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Szerver hiba a mentéskor.');
      }
    });
  }

  logout(): void {
    if (typeof this.authService.logout === 'function') {
      this.authService.logout();
    } else {
      console.warn('Az AuthService-ben nem található logout() funkció.');
    }
  }

  changeLanguage(): void {
    const newLang = this.currentLang === 'hu' ? 'en' : 'hu';
    this.languageService.setLanguage(newLang);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;
    this.cdr.detectChanges();
  }

  scrollToTop(): void {
  window.scrollTo(0, 0);
  
  const container = document.querySelector('.scroll-container');
  if (container) {
    container.scrollTop = 0;
  }
}

closeMobileMenu(): void {
  this.isMenuCollapsed = true;
}
}