import { ServicesService } from './../../services/services-service';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ServicesModel } from '../../models/servicesModel';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { LanguageService } from '../../services/language-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit, OnDestroy {

   currentLang: 'hu' | 'en' = 'hu';

  services?: ServicesModel;

    isAdmin = false;

    editModelServices?: ServicesModel;

  private subs: Subscription[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private servicesService: ServicesService,
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


    this.loadServices();

  }

  loadServices(): void {

    this.servicesService.getServices().subscribe({

      next: (response) => {

        this.services = response.data;

        this.cd.detectChanges();

      },

      error: (err) => {

        console.error('Services adatok betöltési hiba:', err);

      }

    });

  }

    openEditModalServices(): void {
   if (this.services) {
    this.editModelServices = { ...this.services };
  } else {
    this.editModelServices = { serviceOneNameHu: '' } as ServicesModel;
  }
  this.cd.detectChanges();
  }

  saveServices() {
      if (!this.editModelServices) return;
  
      this.servicesService.saveServices(this.editModelServices).subscribe({
        next: (response) => {
          if (response && response.success) {
            
            const closeBtn = document.getElementById('closeEditModalBtnServices') as HTMLButtonElement;
            if (closeBtn) {
              closeBtn.click();
            }
  
            this.services = { ...this.editModelServices } as ServicesModel;
  
            setTimeout(() => {
              this.loadServices();
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
