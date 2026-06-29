import { Component, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { delay } from 'rxjs';
import { ANIMATION_DELAY } from '@core/constants';
import { AddAnimationDirective } from '@core/directives';
import { ShowProyectService } from '@core/services';
import { PortfolioProject } from '@core/interface';
import portfolioProjects from '@assets/data/portfolio-proyects.json';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'app-portfolio',
	imports: [AddAnimationDirective, TranslatePipe],
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
	private showProyectService = inject(ShowProyectService);

	@ViewChild('project', { read: ViewContainerRef })
	project: ViewContainerRef;

	listPorfolio: PortfolioProject[] = portfolioProjects;
	animationOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.2
	};

	ngOnInit(): void {
		this.showProyectService.getProyect();
	}

	async openModal(portfolio: PortfolioProject) {
		const { ProjectComponent } = await import('./components/project/project.component');
		const projectComponent = this.project.createComponent(ProjectComponent);
		const { instance } = projectComponent;

		instance.isLoadProject$.pipe(delay(ANIMATION_DELAY)).subscribe((isLoad) => {
			if (isLoad) {
				instance.openModal(portfolio);
			}
		});

		instance.isCloseModal$.pipe(delay(ANIMATION_DELAY)).subscribe((isClose) => {
			if (isClose) {
				projectComponent.destroy();
			}
		});
	}
}
