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
  // Az új animációs beállítások
  animations: [
    trigger('heroAnimation', [
      transition(':enter', [
        // 1. lépés: Az ÖSSZES animált elemet elrejtjük az elején
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(15px)' })
        ], { optional: true }),

        // 2. lépés: Az ELSŐ elemet (Írógép) azonnal megjelenítjük, hogy elindulhasson a CSS gépelés
        query('.animate-item:nth-child(1)', [
          animate('10ms', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true }),

        // 3. lépés: Megvárjuk a gépelést (3500ms), majd a többi elemet (2., 3., CTA) lépcsőzetesen beúsztatjuk
        query('.animate-item:not(:nth-child(1))', [
          stagger(1000, [ // 1 másodperc különbség a 2., 3. szöveg és a CTA között
            animate('800ms 3500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            // A '3500ms' a fenti sorban a késleltetés (delay) -> megvárja a gépelést!
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Hero implements OnInit, OnDestroy {

  currentLang: 'hu' | 'en' = 'hu';
  // private cdr = inject(ChangeDetectorRef);
  articles: Article[] = [];
  playlists: Article[] = [];
   hero?: HeroModel;
  
    isAdmin = false;
  
    editModel?: HeroModel;
  
  // Egy tömbbe gyűjtjük a feliratkozásokat a biztonságos leiratkozáshoz
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

  // Az admin státusz követése
  this.authService.isLoggedIn$.subscribe(logged => {
    this.isAdmin = logged;
    this.cdr.detectChanges();
  });

  // A session betöltését tegyük be egy setTimeout-ba, hogy ne zavarja meg a kezdeti renderelést
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
        
        // 1. Programozottan bezárjuk a modalt, AMÍG a DOM még stabil
        // const closeBtn = document.getElementById('closeEditModalBtnTwo') as HTMLButtonElement;
        // if (closeBtn) {
        //   closeBtn.click();
        // }

         const closeBtnTwo = document.getElementById('closeEditModalBtnThree') as HTMLButtonElement;
        if (closeBtnTwo) {
          closeBtnTwo.click();
        }

        // 2. Ha a PHP-t átírtad és visszaküldi a data-t, használd azt. 
        // Ha még nem írtad át a PHP-t, a lokális editModel-ből frissítünk.
        if (response.data) {
          this.hero = response.data;
        } else {
          this.hero = { ...this.editModel } as HeroModel;
        }

        // 3. Egy pici egérutat (delay-t) adunk a Bootstrap animációnak, 
        // hogy eltűnjön a szürke háttér, mielőtt az Angular újrarajzolná a felületet.
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
    // Minden feliratkozást lezárunk, ha elhagyjuk a komponenst
    this.subs.forEach(sub => sub.unsubscribe());
  }


}