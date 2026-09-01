import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FeautureModel } from '../../models/feautureModel';
import { HeroModel } from '../../models/heroModel';
import { Subscription } from 'rxjs';
import { HeroService } from '../../services/hero-service';
import { LanguageService } from '../../services/language-service';

@Component({
  selector: 'app-feauture',
  standalone: false,
  templateUrl: './feauture.html',
  styleUrl: './feauture.css',
})
export class Feauture implements AfterViewInit, OnDestroy {

  flippedCards: { [key: number]: boolean } = {};

  cardsVisible = false;

  currentLang: 'hu' | 'en' = 'hu';

  hero?: HeroModel;

  private subs: Subscription[] = [];

  @ViewChild('featureSection', { static: true })
  featureSection!: ElementRef<HTMLElement>;

  constructor(
    private cd: ChangeDetectorRef,
    private heroService: HeroService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {

   
    const langSub = this.languageService.lang$.subscribe(lang => {

      this.currentLang = lang;

      this.cd.detectChanges();

    });

    this.subs.push(langSub);

    
    this.loadHero();

  }

  loadHero(): void {

    this.heroService.getHero().subscribe({

      next: (response) => {

        this.hero = response.data;

        this.cd.detectChanges();

      },

      error: (err) => {

        console.error('Feature adatok betöltési hiba:', err);

      }

    });

  }

  private checkCards(): void {

    const rect = this.featureSection.nativeElement.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.8) {

      this.cardsVisible = true;

    }

  }

  ngAfterViewInit(): void {

    const scroll = document.querySelector('.scroll-container');

    if (!scroll) {

      this.cardsVisible = true;

      return;

    }

   
    this.checkCards();

    scroll.addEventListener('scroll', () => this.checkCards());

  }

  
  toggleCard(serviceId: number): void {

    this.flippedCards[serviceId] =
      !this.flippedCards[serviceId];

  }

  isFlipped(serviceId: number): boolean {

    return !!this.flippedCards[serviceId];

  }

  ngOnDestroy(): void {

    this.subs.forEach(sub => sub.unsubscribe());

  }

}