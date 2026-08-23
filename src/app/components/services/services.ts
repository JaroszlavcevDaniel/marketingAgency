import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {

  scrollToTop(): void {
  window.scrollTo(0, 0);
  
  const container = document.querySelector('.scroll-container');
  if (container) {
    container.scrollTop = 0;
  }
}

}
