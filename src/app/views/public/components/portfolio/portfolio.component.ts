import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IntersectionObserverService, ShowProyectService } from '@core/services';
import { PortfolioProject } from '@core/interface';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import portfolioProjects from '@assets/data/portfolio-proyects.json';

@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, AfterViewInit {
	@ViewChild('swalPortfolio')
	readonly swalPortfolio: SwalComponent;
	safeURL: SafeResourceUrl;
	portfolioSelected: PortfolioProject;
	listPorfolio: PortfolioProject[] = portfolioProjects;

	constructor(
		public readonly swalPortalTargets: SwalPortalTargets,
		private intersectionObserverService: IntersectionObserverService,
		private showProyectService: ShowProyectService,
		private domSanitizer: DomSanitizer
	) {}

	ngOnInit(): void {
		this.showProyectService.resolve();
	}

	openModal(portfolio: PortfolioProject) {
		this.portfolioSelected = portfolio;
		this.safeURL = this.domSanitizer.bypassSecurityTrustResourceUrl(portfolio.preview);

		this.swalPortfolio.title = portfolio.name;
		this.swalPortfolio.fire();
	}

	closeModal() {
		this.swalPortfolio.close();
	}

	ngAfterViewInit(): void {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.2
		};

		const listElementAnimation = [
			{
				id: 'portfolio'
			}
		];

		this.intersectionObserverService.createAnimation(listElementAnimation, options);
	}
}
