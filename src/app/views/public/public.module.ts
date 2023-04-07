import { NgModule } from '@angular/core';
import { CommonModule, DOCUMENT, NgOptimizedImage } from '@angular/common';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public.routing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import {
  AboutComponent,
  CanDoComponent,
  ContactComponent,
  ExperienceComponent,
  FooterComponent,
  HomeComponent,
  PortfolioComponent,
  StudiesComponent,
} from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LanguageSelectorComponent } from './components/home/components';

@NgModule({
  declarations: [
    HomeComponent,
    PublicComponent,
    AboutComponent,
    LanguageSelectorComponent,
    ContactComponent,
    ExperienceComponent,
    PortfolioComponent,
    FooterComponent,
    StudiesComponent,
    CanDoComponent,
  ],
  imports: [
    CommonModule,
    SweetAlert2Module.forRoot(),
    TranslateModule,
    NgOptimizedImage,
    FontAwesomeModule,
    PublicRoutingModule,
  ],
  providers: [{ provide: DOCUMENT, useValue: document }],
})
export class PublicModule {}
