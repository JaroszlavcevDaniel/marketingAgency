import { ServicesService } from './../../services/services-service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ServicesModel } from '../../models/servicesModel';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { LanguageService } from '../../services/language-service';

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
  window.scrollTo(0, 0);
  
  const container = document.querySelector('.scroll-container');
  if (container) {
    container.scrollTop = 0;
  }
}

}
