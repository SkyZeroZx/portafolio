import { NgModule } from '@angular/core';
import { CommonModule, DOCUMENT, NgOptimizedImage } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
	AboutComponent,
	CanDoComponent,
	ContactComponent,
	ExperienceComponent,
	FooterComponent,
	HomeComponent,
	LanguageSelectorComponent,
	PortfolioComponent,
	ProjectComponent,
	StudiesComponent
} from './components';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public.routing';
import { AddAnimationDirective } from '@core/directives';
import { SafeUrlPipe } from '@core/pipe';
import { TechnologiesComponent, TimelineComponent } from '@shared/components';

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
		ProjectComponent
	],
	imports: [
		CommonModule,
		TimelineComponent,
		TechnologiesComponent,
		AddAnimationDirective,
		SafeUrlPipe,
		SweetAlert2Module.forRoot(),
		TranslateModule,
		NgOptimizedImage,
		FontAwesomeModule,
		PublicRoutingModule
	],
	providers: [{ provide: DOCUMENT, useValue: document }]
})
export class PublicModule {}
