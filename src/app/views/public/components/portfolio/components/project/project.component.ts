import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { PortfolioProject } from '@core/interface';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
	@ViewChild('swalPortfolio')
	readonly swalPortfolio: SwalComponent;
	portfolioSelected: PortfolioProject;
	private readonly isLoadProject = new Subject<boolean>();

	constructor(public readonly swalPortalTargets: SwalPortalTargets) {}

	ngOnInit(): void {
		this.isLoadProject.next(true);
		this.isLoadProject.complete();
	}

	get isLoadProject$() {
		return this.isLoadProject.asObservable();
	}

	openModal(portfolio: PortfolioProject) {
		this.portfolioSelected = portfolio;
		this.swalPortfolio.fire();
	}

	closeModal() {
		this.swalPortfolio.close();
	}
}
