import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HeroModel } from '../../models/heroModel';
import { Subscription } from 'rxjs';
import { HeroService } from '../../services/hero-service';
import { LanguageService } from '../../services/language-service';



@Component({
  selector: 'app-technologies',
  standalone: false,
  templateUrl: './technologies.html',
  styleUrl: './technologies.css',
})
export class Technologies  implements OnInit, OnDestroy {

  selectedTool: any = null;

  currentLang: 'hu' | 'en' = 'hu';

  hero?: HeroModel;

  private subs: Subscription[] = [];

  constructor(
    private heroService: HeroService,
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // Nyelv figyelése
    const langSub = this.languageService.lang$.subscribe(lang => {

      this.currentLang = lang;

      this.cdr.detectChanges();

    });

    this.subs.push(langSub);

    // Technológiák betöltése adatbázisból
    this.loadTechnologies();

  }

  loadTechnologies(): void {

    this.heroService.getHero().subscribe({

      next: (response) => {

        this.hero = response.data;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(
          'Technológiák betöltési hiba:',
          err
        );

      }

    });

  }


  // Kiválasztott technológia
  selectTool(tool: any): void {

    this.selectedTool = tool;

  }


  // Popup bezárása
  closePopup(): void {

    this.selectedTool = null;

  }


  ngOnDestroy(): void {

    this.subs.forEach(sub => sub.unsubscribe());

  }

}