import { afterNextRender, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddAnimationDirective } from '@core/directives';
import { PortfolioProject } from '@core/interface';
import { ModalService } from '@core/services';
import portfolioProjectsData from '@assets/data/portfolio-proyects.json';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectComponent } from './components';

@Component({
	selector: 'app-portfolio',
	imports: [AddAnimationDirective, TranslatePipe],
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
	private readonly modalService = inject(ModalService);
	private readonly route = inject(ActivatedRoute);

	readonly portfolioProjects = signal<PortfolioProject[]>(portfolioProjectsData);
	readonly animationOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.2
	};

	constructor() {
		afterNextRender(() => {
			const project = this.getProjectFromQueryParam();

			if (project) {
				void this.openModal(project);
			}
		});
	}

	async openModal(portfolio: PortfolioProject): Promise<void> {
		await this.modalService.open(ProjectComponent, {
			inputs: {
				portfolio,
				closeModal: () => this.closeModal()
			}
		});
	}

	closeModal(): void {
		this.modalService.close();
	}

	private getProjectFromQueryParam(): PortfolioProject | null {
		const projectId = this.route.snapshot.queryParamMap.get('project');

		return this.portfolioProjects().find(({ id }) => id === projectId) ?? null;
	}
}
