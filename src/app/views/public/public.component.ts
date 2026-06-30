import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, Renderer2, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PAGE_SECTION } from '@core/constants';
import { preLoadImages, scrollTo } from '@core/utils';
import { AboutComponent } from './components/about/about.component';
import { AngularPrsComponent } from './components/angular-prs/angular-prs.component';
import { AngularSecurityComponent } from './components/angular-security/angular-security.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

@Component({
	selector: 'app-public',
	imports: [
		AboutComponent,
		AngularPrsComponent,
		AngularSecurityComponent,
		ContactComponent,
		ExperienceComponent,
		FooterComponent,
		HomeComponent,
		PortfolioComponent
	],
	templateUrl: './public.component.html',
	styleUrls: ['./public.component.scss']
})
export class PublicComponent {
	private readonly document = inject<Document>(DOCUMENT);
	private readonly renderer2 = inject(Renderer2);
	private readonly route = inject(ActivatedRoute);

	private contentLoaded = false;

	constructor() {
		afterNextRender(() => {
			void this.loadContent();

			if (this.route.snapshot.queryParamMap.has('project') || this.route.snapshot.queryParamMap.has('proyect')) {
				void this.loadContent();
			}
		});
	}

	async loadContent(): Promise<void> {
		if (this.contentLoaded) {
			return;
		}
		this.contentLoaded = true;
		await this.setBackground();
	}

	async scrollTo() {
		await this.loadContent();

		requestAnimationFrame(() => {
			scrollTo(PAGE_SECTION.EXPERIENCE);
		});
	}

	private async setBackground(): Promise<void> {
		await preLoadImages(['assets/images/home1-bg.jpg']).catch(() => {});
		const bodyElement = this.document.body;

		this.renderer2.removeClass(bodyElement, 'background-preview');
		this.renderer2.addClass(bodyElement, 'background-body');
	}
}
