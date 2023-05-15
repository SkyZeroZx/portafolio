import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { delay } from 'rxjs';
import { ANIMATION_DELAY, PAGE_SECTION } from '@core/constants';

@Component({
	selector: 'app-public',
	templateUrl: './public.component.html',
	styleUrls: ['./public.component.scss']
})
export class PublicComponent {
	@ViewChild('component', { read: ViewContainerRef })
	component: ViewContainerRef;
	isScrolling = false;
	goToCanDo = false;

	constructor(@Inject(DOCUMENT) private document: Document, private renderer2: Renderer2) {}

	async handleScroll() {
		if (!this.isScrolling) {
			this.setBackground();
			this.isScrolling = true;
			await this.loadAllComponents();
		}
		this.isScrolling = true;
	}

	private setBackground() {
		const bodyElement = this.document.getElementsByTagName('body')[0];
		const backgroundImage = new Image();
		backgroundImage.src = '/assets/images/home1-bg.jpg';

		backgroundImage.onload = () => {
			this.renderer2.removeClass(bodyElement, 'background-preview');
			this.renderer2.addClass(bodyElement, 'background-body');
		};
	}

	private async loadAllComponents() {
		await this.loadCanDo();
		await this.loadAbout();
		await this.loadExperience();
		await this.loadStudies();
		await this.loadPortfolio();
		await this.loadContact();
		await this.loadFooter();
	}

	async scrollTo() {
		this.goToCanDo = true;
		this.goTo(PAGE_SECTION.CAN_DO);
		await this.handleScroll();
	}

	goTo(elementId: string) {
		const element = this.document?.getElementById(elementId);
		element?.scrollIntoView({ behavior: 'smooth' });
	}

	private async loadCanDo() {
		const { CanDoComponent } = await import('./components/can-do/can-do.component');
		const {
			instance: { isLoadCanDo$ }
		} = this.component.createComponent(CanDoComponent);

		const loadCanDo = isLoadCanDo$.pipe(delay(ANIMATION_DELAY));

		loadCanDo.subscribe((isLoadCanDo) => {
			isLoadCanDo && this.goToCanDo && this.goTo(PAGE_SECTION.CAN_DO);
		});
	}

	private async loadAbout() {
		const { AboutComponent } = await import('./components/about/about.component');
		this.component.createComponent(AboutComponent);
	}

	private async loadExperience() {
		const { ExperienceComponent } = await import('./components/experience/experience.component');
		this.component.createComponent(ExperienceComponent);
	}

	private async loadStudies() {
		const { StudiesComponent } = await import('./components/studies/studies.component');
		this.component.createComponent(StudiesComponent);
	}

	private async loadPortfolio() {
		const { PortfolioComponent } = await import('./components/portfolio/portfolio.component');
		this.component.createComponent(PortfolioComponent);
	}

	private async loadContact() {
		const { ContactComponent } = await import('./components/contact/contact.component');
		this.component.createComponent(ContactComponent);
	}

	private async loadFooter() {
		const { FooterComponent } = await import('./components/footer/footer.component');
		this.component.createComponent(FooterComponent);
	}
}
