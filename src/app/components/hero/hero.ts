import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Article } from '../../models/articleModel';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language-service';
import { ContentService } from '../../services/content-service';

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
  private cdr = inject(ChangeDetectorRef);
  articles: Article[] = [];
  playlists: Article[] = [];
  
  // Egy tömbbe gyűjtjük a feliratkozásokat a biztonságos leiratkozáshoz
  private subs: Subscription[] = [];

  constructor(
    private languageService: LanguageService,  
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    // Nyelvkövetés + képernyő frissítés kényszerítése
    const langSub = this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
      this.cdr.detectChanges();
    });
    this.subs.push(langSub);

    // Cikkek lekérése
    const articlesSub = this.contentService.getArticles().subscribe(data => {
      this.articles = data;
      this.cdr.detectChanges(); 
    });
    this.subs.push(articlesSub);

    // Lejátszási listák lekérése
    const playlistsSub = this.contentService.getPlaylists().subscribe(data => {
      this.playlists = data;
      this.cdr.detectChanges();
    });
    this.subs.push(playlistsSub);
  }

  ngOnDestroy(): void {
    // Minden feliratkozást tisztítunk, amikor megszűnik a komponens
    this.subs.forEach(sub => sub.unsubscribe());
  }
}