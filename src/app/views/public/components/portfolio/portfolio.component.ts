import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddAnimationDirective } from '@core/directives';
import { PortfolioProject } from '@core/interface';
import portfolioProjectsData from '@assets/data/portfolio-proyects.json';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectComponent } from './components/project/project.component';

@Component({
	selector: 'app-portfolio',
	imports: [AddAnimationDirective, ProjectComponent, TranslatePipe],
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
	private readonly route = inject(ActivatedRoute);

	readonly portfolioProjects = signal<PortfolioProject[]>(portfolioProjectsData);
	readonly selectedProject = signal<PortfolioProject | null>(this.getProjectFromQueryParam());
	readonly animationOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.2
	};

	openModal(portfolio: PortfolioProject): void {
		this.selectedProject.set(portfolio);
	}

	closeModal(): void {
		this.selectedProject.set(null);
	}

	private getProjectFromQueryParam(): PortfolioProject | null {
		const projectId = this.route.snapshot.queryParamMap.get('proyect');

		return this.portfolioProjects().find(({ id }) => id === projectId) ?? null;
	}
}
