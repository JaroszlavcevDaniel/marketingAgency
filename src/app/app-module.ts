import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SpaceBackground } from './components/space-background/space-background';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Footer } from './components/footer/footer';
import { Services } from './components/services/services';
import { Contact } from './components/contact/contact';
import { HttpClientModule } from '@angular/common/http';
import { Login } from './components/login/login';
import { SpacePipe } from './components/pipes/space-pipe';
import { Feauture } from './components/feauture/feauture';
import { Technologies } from './components/technologies/technologies';

@NgModule({
  declarations: [
    App,
    Navbar,
    Hero,
    SpaceBackground,
    Footer,
    Services,
    Contact,
    Login,
    SpacePipe,
    Feauture,
    Technologies
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App]
})
export class AppModule { }
