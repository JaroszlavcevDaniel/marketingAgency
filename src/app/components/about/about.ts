import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { AboutModel } from '../../models/aboutModel';
import { Subscription } from 'rxjs';
import { AboutService } from '../../services/about-service';
import { AuthService } from '../../services/auth-service';
import { LanguageService } from '../../services/language-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit, OnDestroy {

   currentLang: 'hu' | 'en' = 'hu';

  about?: AboutModel;

    isAdmin = false;

    editModelAbout?: AboutModel;

  private subs: Subscription[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private aboutService: AboutService,
        private authService: AuthService,
    private languageService: LanguageService,
      @Inject(PLATFORM_ID) private platformId: Object
    
  ) { }

  ngOnInit(): void {

    const langSub = this.languageService.lang$.subscribe(lang => {

      this.currentLang = lang;

      this.cd.detectChanges();

    });

    this.subs.push(langSub);

    const authSub = this.authService.isLoggedIn$.subscribe(logged => {
  this.isAdmin = logged;
  this.cd.detectChanges();

    });

    this.subs.push(authSub);

    if (typeof this.authService.loadSession === 'function') {
      this.authService.loadSession();
    }


    this.loadAbout();

  }

  loadAbout(): void {

    this.aboutService.getAbout().subscribe({

      next: (response) => {

        this.about = response.data;

        this.cd.detectChanges();

      },

      error: (err) => {

        console.error('About adatok betöltési hiba:', err);

      }

    });

  }

    openEditModalAbout(): void {
   if (this.about) {
    this.editModelAbout = { ...this.about };
  } else {
    this.editModelAbout = { aboutTextHu: '' } as AboutModel;
  }
  this.cd.detectChanges();
  }

  saveAbout() {
      if (!this.editModelAbout) return;
  
      this.aboutService.saveAbout(this.editModelAbout).subscribe({
        next: (response) => {
          if (response && response.success) {
            
            const closeBtn = document.getElementById('closeEditModalBtnAbout') as HTMLButtonElement;
            if (closeBtn) {
              closeBtn.click();
            }
  
            this.about = { ...this.editModelAbout } as AboutModel;
  
            setTimeout(() => {
              this.loadAbout();
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

   ngOnDestroy(): void {

    this.subs.forEach(sub => sub.unsubscribe());

  }

scrollToTop(): void {
   
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });

      const container = document.querySelector('.scroll-container') as HTMLElement | null;
      if (container) {
        container.scrollTop = 0;
      }
    }, 0);
}

}
