import { Component } from '@angular/core';
import { Experience } from '@core/interface';
import experience from '@assets/data/experience.json';

@Component({
	selector: 'app-experience',
	templateUrl: './experience.component.html',
	styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
	listExperience: Experience[] = experience;
	animationOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.2
	};
}
