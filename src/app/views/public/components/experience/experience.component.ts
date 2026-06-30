import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Experience, Study, Timeline } from '@core/interface';
import experienceData from '@assets/data/experience.json';
import studiesData from '@assets/data/studies.json';
import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { TimelineComponent } from '@shared/components';

@Component({
	selector: 'app-experience',
	imports: [TimelineComponent, TranslatePipe],
	templateUrl: './experience.component.html',
	styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
	readonly faBriefcase = faBriefcase;
	readonly faGraduationCap = faGraduationCap;

	readonly experiences = signal<Timeline[]>(
		experienceData.map((experience: Experience) => {
			return {
				id: experience.id,
				title: experience.jobTitle,
				subTitle: experience.company,
				period: experience.period,
				descriptions: experience.activities ?? []
			};
		})
	);
	readonly studies = signal<Timeline[]>(
		studiesData.map((study: Study) => {
			return {
				id: study.id,
				title: study.name,
				subTitle: study.institution,
				period: study.period,
				descriptions: study.description ?? []
			};
		})
	);

	readonly animationOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.2
	};
}
