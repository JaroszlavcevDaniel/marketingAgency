import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  

  private langSubject = new BehaviorSubject <'hu' | 'en'> (
    this.getInitialLang()
  );

  lang$ = this.langSubject.asObservable();

  private getInitialLang(): 'hu' | 'en' {
    if (typeof window === 'undefined') {
      return 'hu';
    }

    return (localStorage.getItem('lang') as 'hu' | 'en') || 'hu';
  }

  setLanguage(lang: 'hu' | 'en'): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
    this.langSubject.next(lang);
  }

  getCurrentLang(): 'hu' | 'en' {
    return this.langSubject.value;
  }
}