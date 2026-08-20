import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-needs',
  standalone: false,
  templateUrl: './needs.html',
  styleUrl: './needs.css',
})
export class Needs implements OnInit {

  // Animált statisztikai adatok
  countersAnimated = false;
  
  statConversion = 0;   // Cél: +180% (Konverzió növekedés)
  statTimeSaved = 0;    // Cél: -45% (Káosz/Kapacitásveszteség csökkenés)
  statTraffic = 0;      // Cél: +220% (SEO & Forgalom)

  // Interaktív kalkulátor változók
  monthlyBudget: number = 500000; // Ft
  estimatedLeads: number = 25;
  estimatedRevenue: number = 2500000;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.calculateImpact();
  }

  // Amikor a felhasználó odagördül, elindul az animáció
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

  // Slider kalkuláció
  onBudgetChange(): void {
    this.calculateImpact();
  }

  private calculateImpact(): void {
    // Becsült kalkuláció a megadott büdzsé alapján
    this.estimatedLeads = Math.round((this.monthlyBudget / 20000) * 1.5);
    this.estimatedRevenue = Math.round(this.monthlyBudget * 4.8);
  }
}