import { Component, HostListener, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language-service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

    currentLang: 'hu' | 'en' = 'hu';

    isScrolled = false;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  changeLanguage(): void {
    const newLang = this.currentLang === 'hu' ? 'en' : 'hu';
    this.languageService.setLanguage(newLang);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;
  }

}
