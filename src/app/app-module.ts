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

@NgModule({
  declarations: [
    App,
    Navbar,
    Hero,
    SpaceBackground,
    Footer,
    Services,
    Contact,
    Login
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
