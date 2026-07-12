import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FeautureModel } from '../../models/feautureModel';

@Component({
  selector: 'app-feauture',
  standalone: false,
  templateUrl: './feauture.html',
  styleUrl: './feauture.css',
})
export class Feauture implements AfterViewInit {
 
  flippedCards: { [key: number]: boolean } = {};

  cardsVisible = false;

@ViewChild('featureSection', { static: true })
featureSection!: ElementRef<HTMLElement>;

constructor(private cd: ChangeDetectorRef) {}

private checkCards() {

  const rect = this.featureSection.nativeElement.getBoundingClientRect();

  if (rect.top < window.innerHeight * 0.8) {
    this.cardsVisible = true;
  }

}

ngAfterViewInit() {

  const scroll = document.querySelector('.scroll-container');

  if (!scroll) {
    this.cardsVisible = true;
    return;
  }

  // első ellenőrzés
  this.checkCards();

  scroll.addEventListener('scroll', () => this.checkCards());

}



  services: FeautureModel[] = [
    {
      id: 1,
      icon: 'bi bi-pie-chart-fill',
      title: 'Audit és Stratégia (Management)',
      picture: '/image/111.jpg',
      shortDescription: 'Kattintson a megtekintéshez',
      longDescription: 'Nem találgatunk, hanem mérünk. Első lépésként átvilágítjuk a jelenlegi működésedet, a munkafolyamatokat és a digitális jelenlétedet. Kiszűrjük a szűk keresztmetszeteket, és felállítunk egy olyan üzleti és management stratégiát, amely tiszta irányt mutat a csapatodnak és mérhető növekedést hoz a cégednek.',
      subServices: [
        // { name: 'Nem találgatunk, hanem mérünk. Első lépésként átvilágítjuk a jelenlegi működésedet, a munkafolyamatokat és a digitális jelenlétedet. Kiszűrjük a szűk keresztmetszeteket, és felállítunk egy olyan üzleti és management stratégiát, amely tiszta irányt mutat a csapatodnak és mérhető növekedést hoz a cégednek.' },
        // { name: 'Digitális & Performance Marketing' },
        // { name: 'Social Media Management' },
        // { name: 'TV, Rádió és Kreatív Offline Kampányok' },
        // { name: 'Influencer & PR Kampányok' }
      ]
    },
    {
      id: 2,
      icon: 'bi bi-person-workspace',
      title: 'Technikai Háttér (Webfejlesztés)',
      picture: '/image/222.jpg',
      shortDescription: 'Kattintson a megtekintéshez',
      longDescription: 'Egy rosszul működő weboldal olyan, mint egy lyukas zsák: hiába öntöd bele a pénzt, elfolyik. Szakértő fejlesztőcsapatunk gatyába rázza vagy teljesen újraépíti a weboldaladat. Modern, villámgyors, mobilbarát és maximálisan felhasználóbarát (UX) felületet hozunk létre, ami nemcsak szép, de valóban értékesít is.',
      subServices: [
        // { name: 'Üzleti Folyamat Optimalizálás' },
        // { name: 'Projekt- és Portfólió Menedzsment' },
        // { name: 'Agilis Transzformáció & Oktatás' },
        // { name: 'Erőforrás- és Kockázatkezelés' },
        // { name: 'Interim Menedzsment Megoldások' }
      ]
    },
    {
      id: 3,
      icon: 'bi bi-lightning-charge-fill',
      title: 'Láthatóság és forgalom (SEO)',
      picture: '/image/333.jpg',
      shortDescription: 'Kattintson a megtekintéshez',
      longDescription: 'Hiába a legjobb szolgáltatás, ha senki sem talál rá. A keresőoptimalizálás (SEO) segítségével elérjük, hogy a potenciális ügyfeleid pont akkor találjanak rád a Google-ben, amikor a legnagyobb szükségük van rád. Rendet teszünk a kulcsszavak között, és hosszú távú, ingyenes látogatóáradatot biztosítunk a megújult weboldaladra.',
      subServices: [
        // { name: 'Technikai SEO Audit & Javítás' },
        // { name: 'Kulcsszókutatás & Konkurenciaelemzés' },
        // { name: 'On-Page SEO & Tartalomstratégia' },
        // { name: 'Prémium Linképítés (Off-Page SEO)' },
        // { name: 'Helyi (Local) SEO vállalkozásoknak' }
      ]
    },
    {
      id: 4,
      icon: 'bi bi-camera-reels-fill',
      title: 'Bizalomépítés (Video Production)',
      picture: '/image/444.jpg',
      shortDescription: 'Kattintson a megtekintéshez',
      longDescription: 'A modern piacon a videó a király. Profi gyártócsapatunkkal prémium minőségű imázsfilmeket, termékvideókat és közösségi média tartalmakat készítünk neked. A vizuális történetmeséléssel nemcsak megragadjuk a figyelmet, de azonnali bizalmat építünk a márkád iránt, bemutatva a céged valódi értékeit.',
      subServices: [
        // { name: 'Kamera előtti színészi felkészítés', highlighted: true },
        // { name: 'TikTok, Reels & YouTube formátumok' },
        // { name: 'Céges Imázsvideók & Reklámfilmek' },
        // { name: 'Forgatókönyv & Kreatív Koncepció' },
        // { name: 'Profi Utómunka (Vágás, VFX, Color Grading)' }
      ]
    },
    {
      id: 5,
      icon: 'bi bi-cpu-fill',
      title: 'Skálázás és Automatizált Értékesítés (Marketing)',
      picture: '/image/555.jpg',
      shortDescription: 'Kattintson a megtekintéshez',
      longDescription: 'Miután a rendszer minden eleme a helyére került, ráadjuk a gázt. Célzott, adatvezérelt marketingkampányokkal (PPC, közösségi média, tartalommarketing) megszólítjuk az ideális célközönségedet. Összekötjük a szálakat, automatizáljuk az értékesítési tölcséreket, így a céged kiszámíthatóan és folyamatosan termeli a profitot.',
      subServices: [
        // { name: 'Egyedi Landing Page-ek' },
        // { name: 'Komplex Webáruházak (Webshops)' },
        // { name: 'SaaS & Egyedi Webalkalmazások' },
        // { name: 'Headless CMS & API Integrációk' },
        // { name: 'UI/UX Tervezés & Prototípusgyártás' }
      ]
    }
  ];

  // Kártya átfordulásának indítása
  toggleCard(serviceId: number): void {
    this.flippedCards[serviceId] = !this.flippedCards[serviceId];
  }

  isFlipped(serviceId: number): boolean {
    return !!this.flippedCards[serviceId];
  }
}
