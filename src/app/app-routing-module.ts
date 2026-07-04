import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Hero } from './components/hero/hero';
import { Services } from './components/services/services';
import { Contact } from './components/contact/contact';

const routes: Routes = [

   { path: '',  component: Hero },
    { path: 'services',  component: Services },
    { path: 'contact',  component: Contact }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
