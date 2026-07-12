import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-technologies',
  standalone: false,
  templateUrl: './technologies.html',
  styleUrl: './technologies.css',
})
export class Technologies {

  selectedTool: any = null;

  tools = [

    {
      name: 'Asana',
      icon: 'image/asana.svg',
      description: 'Az Asana egy felhőalapú projektmenedzsment és feladatkezelő szoftver, amelynek a legfőbb célja, hogy rendet tegyen a napi működési káoszban. Segít abban, hogy a csapatok átlássák, kinek, mit és mikorra kell elvégeznie, így elkerülhető a mikromenedzsment és a végtelen e-mailezés. 1. Projektek és kampányok teljes átláthatósága 2. Feladatok delegálása és felelősök kijelölése 3. Vizuális munkafolyamatok (Kanban, Lista, Idővonal) 4. Belső kommunikáció központosítása'
    },
    {
      name: 'Jira',
      icon: 'image/jira.svg',
      description: 'Fejlesztési feladatok és hibajegyek kezelése.'
    },
    {
      name: 'Google Workspace',
      icon: 'image/gws.svg',
      description: 'Dokumentumok, táblázatok, e-mail és csapatmunka.'
    },
    {
      name: 'Harvest',
      icon: 'image/harvest.svg',
      description: 'Időmérés és projektköltségek követése.'
    },

    {
      name: 'HTML5',
      icon: 'image/html.svg',
      description: 'Weboldalak szerkezetének elkészítése.'
    },
    {
      name: 'CSS3',
      icon: 'image/css.svg',
      description: 'Weboldalak megjelenésének kialakítása.'
    },
    {
      name: 'Angular',
      icon: 'image/angular.svg',
      description: 'Modern webalkalmazások fejlesztése.'
    },
    {
      name: 'React',
      icon: 'image/react.svg',
      description: 'Interaktív felhasználói felületek készítése.'
    },
    {
      name: 'PHP',
      icon: 'image/php.svg',
      description: 'Szerveroldali webfejlesztés.'
    },
    {
      name: 'Python',
      icon: 'image/python.svg',
      description: 'Automatizálás, backend és adatfeldolgozás.'
    },
    {
      name: 'MySQL',
      icon: 'image/sql.svg',
      description: 'Relációs adatbázis kezelése.'
    },

    {
      name: 'Squarespace',
      icon: 'image/squarespace.svg',
      description: 'SEO elemzés és kulcsszókutatás.'
    },
    {
      name: 'Screaming Frog',
      icon: 'image/frog.svg',
      description: 'Weboldalak technikai SEO auditja.'
    },
    {
      name: 'Google Analytics 4',
      icon: 'image/ga.svg',
      description: 'Weboldalforgalom elemzése.'
    },
    {
      name: 'Google Search Console',
      icon: 'image/ggg.svg',
      description: 'Google keresési teljesítmény monitorozása.'
    },

    {
      name: 'Adobe Premiere Pro',
      icon: 'image/adobe.svg',
      description: 'Videószerkesztés.'
    },
    {
      name: 'DaVinci Resolve',
      icon: 'image/davinci.svg',
      description: 'Videóvágás és színkorrekció.'
    },
    {
      name: 'Blender',
      icon: 'image/blender.svg',
      description: '3D modellezés és animáció.'
    },
    {
      name: 'CapCut',
      icon: 'image/capcut.svg',
      description: 'Gyors videószerkesztés közösségi médiára.'
    },

    {
      name: 'Google Ads',
      icon: 'image/glg.svg',
      description: 'Google hirdetések kezelése.'
    },
    {
      name: 'Meta Ads',
      icon: 'image/meta.svg',
      description: 'Facebook és Instagram hirdetések.'
    },
    {
      name: 'TikTok Ads',
      icon: 'image/tiktok.svg',
      description: 'TikTok kampányok kezelése.'
    },
    {
      name: 'Buffer',
      icon: 'image/buffer.svg',
      description: 'Közösségi média posztok ütemezése.'
    },
    {
      name: 'Hootsuite',
      icon: 'image/suit.svg',
      description: 'Social media kezelés és monitorozás.'
    }

  ];

}