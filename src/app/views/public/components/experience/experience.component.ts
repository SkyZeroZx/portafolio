import { AfterViewInit, Component } from '@angular/core';
import { Experience } from '@core/interface';
import { IntersectionObserverService } from '@core/services';
import experience from '@assets/data/experience.json';

@Component({
	selector: 'app-experience',
	templateUrl: './experience.component.html',
	styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements AfterViewInit {
	listExperience: Experience[] = experience;

	constructor(private intersectionObserverService: IntersectionObserverService) {}

	ngAfterViewInit(): void {
		const options: IntersectionObserverInit = {
			root: null,
			rootMargin: '0px',
			threshold: 0.4
		};

		this.intersectionObserverService.createAnimation(this.listExperience, options);
	}
}
