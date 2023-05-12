import { Component, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { PortfolioProject } from '@core/interface';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
	@ViewChild('swalPortfolio')
	readonly swalPortfolio: SwalComponent;
	portfolioSelected: PortfolioProject;

	constructor(public readonly swalPortalTargets: SwalPortalTargets) {}

	openModal(portfolio: PortfolioProject) {
		setTimeout(() => {
			this.portfolioSelected = portfolio;
			this.swalPortfolio.title = portfolio.name;
			this.swalPortfolio.fire();
		}, 10);
	}

	closeModal() {
		this.swalPortfolio.close();
	}
}
