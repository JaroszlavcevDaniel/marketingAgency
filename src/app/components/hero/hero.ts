import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Article } from '../../models/articleModel';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language-service';
import { ContentService } from '../../services/content-service';
import { HeroModel } from '../../models/heroModel';
import { HeroService } from '../../services/hero-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  animations: [
    trigger('heroAnimation', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(15px)' })
        ], { optional: true }),

        query('.animate-item:nth-child(1)', [
          animate('10ms', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true }),

        query('.animate-item:not(:nth-child(1))', [
          stagger(1000, [ 
            animate('800ms 3500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})

export class Hero implements OnInit, OnDestroy {

  currentLang: 'hu' | 'en' = 'hu';
  articles: Article[] = [];
  playlists: Article[] = [];
   hero?: HeroModel;
  
    isAdmin = false;
  
    editModel?: HeroModel;
  
  private subs: Subscription[] = [];

  constructor(
    private languageService: LanguageService,  
    private contentService: ContentService,
     private heroService: HeroService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef
  ) {}

 ngOnInit(): void {
  const langSub = this.languageService.lang$.subscribe(lang => {
    this.currentLang = lang;
    this.cdr.detectChanges();
  });
  this.subs.push(langSub);

  this.authService.isLoggedIn$.subscribe(logged => {
    this.isAdmin = logged;
    this.cdr.detectChanges();
  });

  if (typeof this.authService.loadSession === 'function') {
    setTimeout(() => {
      this.authService.loadSession();
    });
  }
  
  this.loadHero();
}

  loadHero() {

    this.heroService.getHero().subscribe({

      next: (response) => {

        this.hero = response.data;
        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }


  openEditModal() {
    if (this.hero) {
      this.editModel = { ...this.hero };
    }
  }

 saveHero() {
  if (!this.editModel) return;

  this.heroService.saveHero(this.editModel).subscribe({
    next: (response) => {
      if (response && response.success) {
        

         const closeBtnTwo = document.getElementById('closeEditModalBtnThree') as HTMLButtonElement;
        if (closeBtnTwo) {
          closeBtnTwo.click();
        }

        if (response.data) {
          this.hero = response.data;
        } else {
          this.hero = { ...this.editModel } as HeroModel;
        }

        setTimeout(() => {
          this.cdr.detectChanges();
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

 saveHeroTwo() {
  if (!this.editModel) return;

  this.heroService.saveHero(this.editModel).subscribe({
    next: (response) => {
      if (response && response.success) {
        

         const closeBtnTwo = document.getElementById('closeEditModalBtnFour') as HTMLButtonElement;
        if (closeBtnTwo) {
          closeBtnTwo.click();
        }

        if (response.data) {
          this.hero = response.data;
        } else {
          this.hero = { ...this.editModel } as HeroModel;
        }

        setTimeout(() => {
          this.cdr.detectChanges();
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

saveHeroThree() {
  if (!this.editModel) return;

  this.heroService.saveHero(this.editModel).subscribe({
    next: (response) => {
      if (response && response.success) {
        

         const closeBtnTwo = document.getElementById('closeEditModalBtnFive') as HTMLButtonElement;
        if (closeBtnTwo) {
          closeBtnTwo.click();
        }

        if (response.data) {
          this.hero = response.data;
        } else {
          this.hero = { ...this.editModel } as HeroModel;
        }

        setTimeout(() => {
          this.cdr.detectChanges();
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

saveHeroFour() {
  if (!this.editModel) return;

  this.heroService.saveHero(this.editModel).subscribe({
    next: (response) => {
      if (response && response.success) {
        

         const closeBtnTwo = document.getElementById('closeEditModalBtnSix') as HTMLButtonElement;
        if (closeBtnTwo) {
          closeBtnTwo.click();
        }

        if (response.data) {
          this.hero = response.data;
        } else {
          this.hero = { ...this.editModel } as HeroModel;
        }

        setTimeout(() => {
          this.cdr.detectChanges();
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