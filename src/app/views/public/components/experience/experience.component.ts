import { Component } from '@angular/core';
import { Experience, Timeline } from '@core/interface';
import experience from '@assets/data/experience.json';

@Component({
	selector: 'app-experience',
	templateUrl: './experience.component.html',
	styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
	listExperience: Timeline[] = experience.map((experience: Experience) => {
		return {
			id: experience.id,
			title: experience.jobTitle,
			subTitle: experience.company,
			period: experience.period,
			descriptions: experience.activities
		};
	});

	animationOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.2
	};
}
