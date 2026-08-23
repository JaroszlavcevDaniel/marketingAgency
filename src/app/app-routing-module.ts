import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Hero } from './components/hero/hero';
import { Services } from './components/services/services';
import { Contact } from './components/contact/contact';
import { Feauture } from './components/feauture/feauture';
import { Needs } from './components/needs/needs';
import { References } from './components/references/references';
import { About } from './components/about/about';

const routes: Routes = [

   { path: '',  component: Hero },
    { path: 'services',  component: Services },
    { path: 'contact',  component: Contact },
      { path: 'feauture',  component: Feauture },
      { path: 'needs',  component: Needs },
      { path: 'references',  component: References },
      { path: 'about',  component: About }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled' 
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
