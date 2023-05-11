import { Component, OnInit, ViewChild } from '@angular/core';
import { ShowProyectService } from '@core/services';
import { PortfolioProject } from '@core/interface';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import portfolioProjects from '@assets/data/portfolio-proyects.json';

@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
	@ViewChild('swalPortfolio')
	readonly swalPortfolio: SwalComponent;
	portfolioSelected: PortfolioProject;
	listPorfolio: PortfolioProject[] = portfolioProjects;
	animationOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.2
	};

	constructor(public readonly swalPortalTargets: SwalPortalTargets, private showProyectService: ShowProyectService) {}

	ngOnInit(): void {
		this.showProyectService.getProyect();
	}

	openModal(portfolio: PortfolioProject) {
		this.portfolioSelected = portfolio;
		this.swalPortfolio.title = portfolio.name;
		this.swalPortfolio.fire();
	}

	closeModal() {
		this.swalPortfolio.close();
	}
}
