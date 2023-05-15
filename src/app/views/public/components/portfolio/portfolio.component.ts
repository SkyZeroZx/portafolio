import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { delay } from 'rxjs';
import { ANIMATION_DELAY } from '@core/constants';
import { ShowProyectService } from '@core/services';
import { PortfolioProject } from '@core/interface';
import portfolioProjects from '@assets/data/portfolio-proyects.json';

@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
	@ViewChild('project', { read: ViewContainerRef })
	project: ViewContainerRef;

	listPorfolio: PortfolioProject[] = portfolioProjects;
	animationOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.2
	};

	constructor(private showProyectService: ShowProyectService) {}

	ngOnInit(): void {
		this.showProyectService.getProyect();
	}

	async openModal(portfolio: PortfolioProject) {
		const { ProjectComponent } = await import('./components/project/project.component');
		const { instance } = this.project.createComponent(ProjectComponent);

		instance.isLoadProject$.pipe(delay(ANIMATION_DELAY)).subscribe((isLoad) => {
			isLoad && instance.openModal(portfolio);
		});
	}
}
