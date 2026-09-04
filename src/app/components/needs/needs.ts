import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { HeroModel } from '../../models/heroModel';
import { Subscription } from 'rxjs';
import { HeroService } from '../../services/hero-service';
import { LanguageService } from '../../services/language-service';

@Component({
  selector: 'app-needs',
  standalone: false,
  templateUrl: './needs.html',
  styleUrl: './needs.css',
})
export class Needs implements OnInit, OnDestroy {

  countersAnimated = false;
  
  statConversion = 0;   // Cél: +180% (Konverzió növekedés)
  statTimeSaved = 0;    // Cél: -45% (Káosz/Kapacitásveszteség csökkenés)
  statTraffic = 0;      // Cél: +220% (SEO & Forgalom)

  monthlyBudget: number = 500000; // Ft
  estimatedLeads: number = 25;
  estimatedRevenue: number = 2500000;

  currentLang: 'hu' | 'en' = 'hu';
  
    hero?: HeroModel;
  
    private subs: Subscription[] = [];

  constructor(
    private el: ElementRef,
    private cd: ChangeDetectorRef,
    private heroService: HeroService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.calculateImpact();

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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.countersAnimated && this.isElementInViewport()) {
      this.animateCounters();
      this.countersAnimated = true;
    }
  }

  private isElementInViewport(): boolean {
    const rect = this.el.nativeElement.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8;
  }

  private animateCounters(): void {
    this.animateValue((val) => this.statConversion = val, 0, 180, 1500);
    this.animateValue((val) => this.statTimeSaved = val, 0, 45, 1200);
    this.animateValue((val) => this.statTraffic = val, 0, 220, 1800);
  }

  private animateValue(updateFn: (val: number) => void, start: number, end: number, duration: number): void {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      updateFn(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  onBudgetChange(): void {
    this.calculateImpact();
  }

  private calculateImpact(): void {
    this.estimatedLeads = Math.round((this.monthlyBudget / 20000) * 1.5);
    this.estimatedRevenue = Math.round(this.monthlyBudget * 4.8);
  }

   ngOnDestroy(): void {

    this.subs.forEach(sub => sub.unsubscribe());

  }
}