import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FooterModel } from '../../models/footerModel';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language-service';
import { FooterService } from '../../services/footer-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit, OnDestroy {

  currentLang: 'hu' | 'en' = 'hu';

  footer?: FooterModel;

    isAdmin = false;

    editModel?: FooterModel;

  private subs: Subscription[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private footerService: FooterService,
        private authService: AuthService,
    private languageService: LanguageService,
    //  private cdr: ChangeDetectorRef
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


    this.loadFooter();

  }

  loadFooter(): void {

    this.footerService.getFooter().subscribe({

      next: (response) => {

        this.footer = response.data;

        this.cd.detectChanges();

      },

      error: (err) => {

        console.error('Footer adatok betöltési hiba:', err);

      }

    });

  }

    openEditModalFooter(): void {
   if (this.footer) {
    this.editModel = { ...this.footer };
  } else {
    this.editModel = { companyNameHu: '' } as FooterModel;
  }
  this.cd.detectChanges();
  }

  saveFooter() {
      if (!this.editModel) return;
  
      this.footerService.saveFooter(this.editModel).subscribe({
        next: (response) => {
          if (response && response.success) {
            
            const closeBtn = document.getElementById('closeEditModalBtnFooter') as HTMLButtonElement;
            if (closeBtn) {
              closeBtn.click();
            }
  
            this.footer = { ...this.editModel } as FooterModel;
  
            setTimeout(() => {
              this.loadFooter();
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

}
