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
      title: 'Marketing',
      picture: '/image/111.jpg',
      shortDescription: 'Nem csak hirdetünk: teljes körű növekedési stratégiákat építünk offline és online téren is.',
      longDescription: 'A marketing nálunk egy komplex ökoszisztéma, ami a célközönséged pszichológiájára épül.',
      subServices: [
        { name: 'Marketing & Márka Stratégia' },
        { name: 'Digitális & Performance Marketing' },
        { name: 'Social Media Management' },
        { name: 'TV, Rádió és Kreatív Offline Kampányok' },
        { name: 'Influencer & PR Kampányok' }
      ]
    },
    {
      id: 2,
      icon: 'bi bi-person-workspace',
      title: 'Management',
      picture: '/image/222.jpg',
      shortDescription: 'Folyamatok optimalizálása, hogy a céged akkor is működjön, ha te épp pihensz.',
      longDescription: 'Szervezetfejlesztés és hatékonyság növelés a legújabb agilis módszertanokkal.',
      subServices: [
        { name: 'Üzleti Folyamat Optimalizálás' },
        { name: 'Projekt- és Portfólió Menedzsment' },
        { name: 'Agilis Transzformáció & Oktatás' },
        { name: 'Erőforrás- és Kockázatkezelés' },
        { name: 'Interim Menedzsment Megoldások' }
      ]
    },
    {
      id: 3,
      icon: 'bi bi-lightning-charge-fill',
      title: 'SEO',
      picture: '/image/333.jpg',
      shortDescription: 'Hosszú távú, organikus láthatóság. Ott vagyunk, ahol a vevőid keresnek.',
      longDescription: 'Az algoritmusok változnak, de a minőségi, strukturált tartalom és technikai alap örök.',
      subServices: [
        { name: 'Technikai SEO Audit & Javítás' },
        { name: 'Kulcsszókutatás & Konkurenciaelemzés' },
        { name: 'On-Page SEO & Tartalomstratégia' },
        { name: 'Prémium Linképítés (Off-Page SEO)' },
        { name: 'Helyi (Local) SEO vállalkozásoknak' }
      ]
    },
    {
      id: 4,
      icon: 'bi bi-camera-reels-fill',
      title: 'Videó Készítés',
      picture: '/image/444.jpg',
      shortDescription: 'Mozi minőségű produkciók a koncepciótól a képernyőig, beépített kamera-felkészítéssel.',
      longDescription: 'Nemcsak leforgatjuk a videót, de felkészítünk, hogy magabiztosan, színészi precizitással beszélj a kamera előtt.',
      subServices: [
        { name: 'Kamera előtti színészi felkészítés', highlighted: true },
        { name: 'TikTok, Reels & YouTube formátumok' },
        { name: 'Céges Imázsvideók & Reklámfilmek' },
        { name: 'Forgatókönyv & Kreatív Koncepció' },
        { name: 'Profi Utómunka (Vágás, VFX, Color Grading)' }
      ]
    },
    {
      id: 5,
      icon: 'bi bi-cpu-fill',
      title: 'Webfejlesztés',
      picture: '/image/555.jpg',
      shortDescription: 'Gyors, biztonságos és konverzióra optimalizált digitális termékek.',
      longDescription: 'A legmodernebb technológiákat alkalmazzuk, hogy az oldalad élmény legyen a látogatónak.',
      subServices: [
        { name: 'Egyedi Landing Page-ek' },
        { name: 'Komplex Webáruházak (Webshops)' },
        { name: 'SaaS & Egyedi Webalkalmazások' },
        { name: 'Headless CMS & API Integrációk' },
        { name: 'UI/UX Tervezés & Prototípusgyártás' }
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
