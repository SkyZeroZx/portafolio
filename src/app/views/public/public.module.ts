import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
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
import { TechnologiesComponent, TimelineComponent, ModalComponent } from '@shared/components';
import { NgxTypedWriterModule } from 'ngx-typed-writer';

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
		NgxTypedWriterModule,
		SafeUrlPipe,
		ModalComponent,
		TranslateModule,
		NgOptimizedImage,
		FontAwesomeModule,
		PublicRoutingModule
	]
})
export class PublicModule {}
