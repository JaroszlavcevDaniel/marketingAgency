import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { LanguageService } from '../../services/language-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cookie',
  standalone: false,
  templateUrl: './cookie.html',
  styleUrl: './cookie.css',
})
export class Cookie implements OnInit, OnDestroy {

currentLang: 'hu' | 'en' = 'hu';
  showBanner = false;
  showSettings = false;

  statisticsCookies = false;

  private readonly cookieStorageKey = 'cookie-consent';

    private subs: Subscription[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
     private cd: ChangeDetectorRef,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {

      const langSub = this.languageService.lang$.subscribe(lang => {

      this.currentLang = lang;

      this.cd.detectChanges();

    });

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadConsent();

  }

     ngOnDestroy(): void {
  
      this.subs.forEach(sub => sub.unsubscribe());
  
    }


  private loadConsent(): void {

    const savedConsent = localStorage.getItem(
      this.cookieStorageKey
    );

    if (!savedConsent) {

      this.showBanner = true;

      return;
    }

    try {

      const consent = JSON.parse(savedConsent);

      this.statisticsCookies =
        consent.statistics === true;

      this.showBanner = false;

    } catch {

      localStorage.removeItem(
        this.cookieStorageKey
      );

      this.showBanner = true;
    }
  }


  acceptAll(): void {

    this.statisticsCookies = true;

    this.saveConsent();

  }


  acceptNecessary(): void {

    this.statisticsCookies = false;

    this.saveConsent();

  }


  openSettings(): void {

    this.showSettings = true;

  }


  closeSettings(): void {

    this.showSettings = false;

  }


  saveSettings(): void {

    this.saveConsent();

  }


  private saveConsent(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const consent = {

      necessary: true,

      statistics: this.statisticsCookies,

      timestamp: new Date().toISOString()

    };

    localStorage.setItem(

      this.cookieStorageKey,

      JSON.stringify(consent)

    );

    this.showBanner = false;

    this.showSettings = false;

    this.handleStatisticsConsent();

  }


  private handleStatisticsConsent(): void {

    if (this.statisticsCookies) {


      console.log(
        'Statistics cookies accepted.'
      );

    }

  }

}