import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public.routing';
import {
  AboutComponent,
  ContactComponent,
  ExperienceComponent,
  FooterComponent,
  HomeComponent,
  StudiesComponent,
  PortfolioComponent,
} from './components';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CanDoComponent } from './components/can-do/can-do.component';

@NgModule({
  declarations: [
    HomeComponent,
    PublicComponent,
    AboutComponent,
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
    NgOptimizedImage,
    FontAwesomeModule,
    PublicRoutingModule,
  ],
})
export class PublicModule {}
