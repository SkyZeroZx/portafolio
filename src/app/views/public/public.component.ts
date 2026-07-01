import { DOCUMENT } from '@angular/common';
import { DestroyRef, afterNextRender, Component, Renderer2, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PAGE_SECTION } from '@core/constants';
import { preLoadImages } from '@core/utils/lazy-load-image.utils';
import { scrollTo as scrollToElement } from '@core/utils/scroll-to-elementId.utils';
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
	private readonly destroyRef = inject(DestroyRef);
	private readonly renderer2 = inject(Renderer2);
	private readonly route = inject(ActivatedRoute);

	private contentLoaded = false;

	constructor() {
		afterNextRender(() => {
			if (this.route.snapshot.queryParamMap.has('project')) {
				void this.loadContent();
				return;
			}

			this.registerDeferredBackgroundLoad();
		});
	}

	loadContent(): void {
		if (this.contentLoaded) {
			return;
		}

		this.contentLoaded = true;
		void this.setBackground();
	}

	scrollTo(): void {
		this.loadContent();
		requestAnimationFrame(() => scrollToElement(PAGE_SECTION.ABOUT));
	}

	private async setBackground(): Promise<void> {
		await preLoadImages(['assets/images/home1-bg.jpg']).catch(() => {});
		const bodyElement = this.document.body;

		this.renderer2.removeClass(bodyElement, 'background-preview');
		this.renderer2.addClass(bodyElement, 'background-body');
	}

	private registerDeferredBackgroundLoad(): void {
		const events = ['scroll', 'wheel', 'touchstart', 'keydown'];
		const cleanupCallbacks: Array<() => void> = [];
		const loadBackground = () => {
			for (const cleanup of cleanupCallbacks.splice(0)) {
				cleanup();
			}

			this.loadContent();
		};

		for (const eventName of events) {
			this.document.addEventListener(eventName, loadBackground, { capture: true, once: true, passive: true });
			cleanupCallbacks.push(() => this.document.removeEventListener(eventName, loadBackground, { capture: true }));
		}

		this.destroyRef.onDestroy(() => {
			for (const cleanup of cleanupCallbacks.splice(0)) {
				cleanup();
			}
		});
	}
}
